"use strict";

const { genSalt, hash, compare } = require("bcryptjs");
const { db, storage } = require("../db/connectDB");
// const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { collection, getDocs, query, where, setDoc, doc } = require("firebase/firestore/lite");
const { ref, uploadBytes } = require("firebase/storage");
const { generateUniqueID } = require("../miscFunctions");
const jwt = require("jsonwebtoken");

// const pdfFile = require("../testpdf.pdf");
const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body.user;
    const userCol = query(collection(db, "users"), where("email", "==", email));
    const userSnapshot = await getDocs(userCol);
    var usergot = false;
    userSnapshot.forEach((doc) => {
        usergot = doc.data();
    });
    if (usergot != false) {
        const validPassword = await compare(password, usergot.password);

        if (validPassword) {
            // req.session.isAuth = true;
            res.status(200).json({
                success: true,
                data: usergot,
                token: generateToken(usergot.id),

                // token: generateToken(),
            });
        } else {
            res.status(401).json({
                status: false,
                message: "Invalid password.",
            });
        }
    } else {
        res.status(404).json({
            success: false,
            message: "User does not exist.",
        });
    }
});

const registerUser = asyncHandler(async (req, res, next) => {
    const userdetails = req.body.user;
    const userCol = query(collection(db, "users"), where("email", "==", userdetails.email));
    const userSnapshot = await getDocs(userCol);
    console.log(userSnapshot);

    var usergot = false;

    userSnapshot.forEach((doc) => {
        usergot = doc.data();
    });

    if (usergot === false) {
        // ! generate salt to hash password
        const salt = await genSalt(10);

        // ! now we set user password to hashed password
        userdetails.password = await hash(userdetails.password, salt);
        const userID = generateUniqueID("U");

        const data = { id: userID, ...userdetails, boards: [], date: new Date() };
        // console.log(data);
        const userCol = collection(db, "users");

        await setDoc(doc(userCol, userID), data)
            .then((user) => {
                // console.log(user);
                res.status(200).json({
                    success: true,
                    data: data,
                    token: generateToken(data.id),
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({
                    success: false,
                    data: err,
                });
            });
    } else {
        res.status(400).json({
            success: false,
            message: "User already exists.",
        });
    }
});

const getMe = asyncHandler(async (req, res, next) => {
    res.status(200).json(req.user);
});

const uploadPdf = async (req, res) => {
    const fileName = "pdfs/" + new Date().getTime().toString();
    const storageRef = ref(storage, fileName);

    uploadBytes(storageRef, "../testpdf.pdf").then((snapshot) => {});
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

module.exports = {
    registerUser,
    loginUser,
    uploadPdf,
    getMe,
};
