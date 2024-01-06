"use strict";

const express = require("express");
const { getPdf, addPdf, getAllPdfs, grantAccess, sendURL} = require("../controllers/boardController");
const { protect } = require("../middleware/authMiddleware");
const multer= require('multer');

const router = express.Router();

const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
  });

const upload= multer({storage:storage});

router.post("/api/getPdf", getPdf);
// router.post("/addPdf", [protect, upload.any()], addPdf);
router.post("/api/addPdf", upload.single('file'), addPdf);

// router.get("/getPDFUrl",sendURL)

module.exports = router;
