"use strict";

const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { registerUser, loginUser, uploadPdf, getMe } = require("../controllers/userController");
const router = express.Router();

router.post("/users/register", registerUser);
router.post("/users/login", loginUser);
router.post("/users/uploadPdf", uploadPdf);
router.get("/users/me", protect, getMe);
// router.get("/users/getPdf", getPdf);

module.exports = router;
