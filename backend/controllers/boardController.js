"use strict";

const { genSalt, hash, compare } = require("bcryptjs");
const { db, storage } = require("../db/connectDB");

const { DownloaderHelper } = require('node-downloader-helper');

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const {
    collection,
    getDocs,
    getDoc,
    query,
    where,
    setDoc,
    doc,
    updateDoc,
} = require("firebase/firestore/lite");
var fs = require('fs');


const { ref, uploadBytes, getDownloadURL, uploadString } = require("firebase/storage");
const asyncHandler = require("express-async-handler");
const { generateUniqueID } = require("../miscFunctions");

const downloadFile= async (url)=>{
    const download = new DownloaderHelper(url, './public/downloads');
    await download.on('end', () => console.log('\n'))
    await download.start();
}

const getImages= asyncHandler(async(req,res,next) =>{
    console.log(req.body);
})
const getPdf = asyncHandler(async (req, res, next) => {
    // console.log("in call");
    var {pdf_name, course_id} = req.body;
    pdf_name = pdf_name.replace(/ /g, '%20');
    // console.log(pdf_name+" "+course_id);
    const pdfRef = ref(storage, `${course_id}/${pdf_name}`);
    // const docRef = doc(db, "boards", boardID);
    // const docSnap = await getDoc(docRef);
    // const {boards} = docSnap.data();
    // const { boards } = req.user;

    // let flag = false;
    // for (let board of boards) {
    //     if (board === fileid) {
    //         flag = true;
    //         break;
    //     }
    // }

    // if (!flag) {
    //     res.status(401).json({ success: false, message: "No authorized" });
    //     return;
    // }

    // console.log(req);
    // console.log(fileid);
    getDownloadURL(pdfRef)
        .then(async (url) => {
            await downloadFile(url);
            var filePath;

            // if(pdf_name.includes('%20'))
                filePath= './public/downloads/' + pdf_name.replace(/%20/g, '%2520');
            // else
            //     filePath= './public/downloads/' + pdf_name;

            var buffer = fs.readFileSync(filePath);

            var stats = fs.statSync(filePath)
            var fileSizeInBytes = stats.size;

            const pdfFile = {
                fieldname: 'files',
                originalname: pdf_name,
                encoding: '7bit',
                mimetype: 'application/pdf',
                buffer: buffer,
                size: fileSizeInBytes
            }
            fs.unlinkSync(filePath);
            // console.log("PDF Sent.")
            res.status(200).send(pdfFile)

        })
        .catch((err) => {
            console.log(err);
            res.status(401).json({
                success: false,
                pdfLink: null,
            });
        });
    
});

const ret = async (boards) => {
    let links = [];

    for (let x of boards) {
        const docRef = doc(db, "boards", x);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        links.push(data);
    }

    return links;
};

const getAllPdfs = asyncHandler(async (req, res, next) => {
    const userID = req.user.id;
    const boards = req.user.boards;

    try {
        var info = await ret(boards);
        res.status(200).json({
            success: true,
            pdfInfo: info,
        });
    } catch (error) {
        res.status(200).json({
            success: true,
            pdfInfo: null,
            message: "Not able to retreive pdfs",
        });
    }
});

const uploadPDF = (pdfUpload, fileName,c_id,res) => {
    if (pdfUpload == null) return;
    // console.log(pdfUpload);
    // console.log(pdfUpload.buffer);
    fileName = fileName.replace(/ /g, '%20');
    const pdfRef = ref(storage, c_id+"/"+fileName);
    const metadata = {
        contentType: "application/pdf",
    };
    uploadBytes(pdfRef, pdfUpload.buffer, metadata).then(() => {
        // console.log("PDF uploaded");
        res.status(200).json({
            success: true,
            message: "board added"
        });
    });
};

const addPdf = asyncHandler(async (req, res, next) => {
    // Pass the {course_id, pdf_name} in the request from react to this function
    const pdf_name = req.file.filename;

    const {course_id} = req.body;

    try {
        // const pdfFile = req.files[0]; //Pass file in req.files[0]

        let filePath='./public/uploads/' + pdf_name;

        var buffer = fs.readFileSync(filePath);

        var stats = fs.statSync(filePath)
        var fileSizeInBytes = stats.size;

        var pdfFile = {
            fieldname: 'files',
            originalname: pdf_name,
            encoding: '7bit',
            mimetype: 'application/pdf',
            buffer: buffer,
            size: fileSizeInBytes
        }
        // const arrayBuffer= new Buffer.alloc(buffer.byteLength);
        // const view= new Uint8Array(arrayBuffer);
        // for (let i=0;i<buffer.length;++i){
        //     view[i]=buffer[i];
        // }
        // console.log(pdfFile);
        // console.log(view)

        uploadPDF(pdfFile, pdf_name, course_id,res);
        // res.status(200).json({
        //     success: true,
        //     message: "board added"
        // });
        fs.unlinkSync(filePath);
    
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: "Could not upload file" });
        return;
    }
    // const boardCol = collection(db, "boards");
    // const userCol = collection(db, "users");

    // await setDoc(doc(boardCol, pdf_name), boardInfo)
    //     .then(async (board) => {
    //         // console.log(user);
    //         var boards = req.user.boards;
    //         boards.push(pdf_name);

    //         await updateDoc(doc(userCol, userID), { boards: boards });

    //         res.status(200).json({
    //             success: true,
    //             data: boardInfo,
    //         });
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         res.status(400).json({
    //             success: false,
    //             data: err,
    //         });
    //     });
});

const grantAccess = asyncHandler(async (req, res, next) => {
    const { newUserID, boardID } = req.body; // stores the user to be given access

    const docRef = doc(db, "boards", boardID);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    // console.log(data);

    // console.log(docSnap);
    // console.log(docSnap);

    if (data.owner != req.user.id) {
        res.status(401).json({
            success: false,
            message: "You are not the owner of this board. You cannot edit access!!",
        });
    } else if (data.owner === req.user.id) {
        try {
            const boardCol = collection(db, "boards");
            const userCol = collection(db, "users");
            const tempUser = await getDoc(doc(userCol, newUserID));
            const { boards } = tempUser.data();

            var flag = true;

            for (let board of boards) {
                if (board === boardID) {
                    flag = false;
                    break;
                }
            }

            if (flag) {
                boards.push(boardID);
                await updateDoc(doc(userCol, newUserID), { boards: boards });

                const tempBoard = await getDoc(doc(boardCol, boardID));
                const { accessGranted } = tempBoard.data();
                accessGranted.push(newUserID);
                await updateDoc(doc(boardCol, boardID), { accessGranted: accessGranted });
                res.status(200).json({
                    success: true,
                });
            } else {
                res.status(200).json({
                    success: false,
                    message: "Access already granted",
                });
            }
        } catch (error) {
            res.status(401).json({
                success: flase,
                message: error.message,
            });
        }
    }
});

//changed by me
module.exports = {
    getPdf,
    addPdf,
    getAllPdfs,
    grantAccess,
    getImages
};
