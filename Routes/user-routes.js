"use strict";

const express = require("express");
const { S3uplaod } = require("../middleware/upload");
const upload_pdf = require("../middleware/upload");
const userRoutes = express.Router();
const cloudinary = require("cloudinary");
const user = require("../api/pdf-merger/user");

userRoutes.get("/home", user.checkWorking);
userRoutes.post("/add/user", user.colletUserData);

//UPLOAD-FILE-TO-S3
userRoutes.post("/merge/single/uplaodPdf",upload_pdf.S3upload.single("file"),user.UploadPDF_S);

//MERGE-CODE
userRoutes.get("/mergeAllPDF", user.mergeAllPDF);

//

module.exports = {
  userRoutes: userRoutes,
};

// cloudinary.v2.uploader.upload("sample.pdf",
//   function(error, result) {console.log(result, error); });
