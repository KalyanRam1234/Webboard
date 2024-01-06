const { db } = require("../db/connectDB");
const { doc, getDoc } = require("firebase/firestore/lite");

const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const docRef = doc(db, "users", decoded.id);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            delete data["password"];
            req.user = data;

            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: "Not authorized",
                });
            }

            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({
                success: false,
                message: "Not authorized",
            });
        }
    }

    if (!token) {
        res.status(401).json({
            success: false,
            message: "Not authorized",
        });
    }
});

module.exports = { protect };
