const express = require("express");
const cloudinary = require("cloudinary");
const multer = require("multer");
require("dotenv").config();
let size = process.env.SIZE;

let PDF_File_LocakStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    var dir = "./public/";
    return callback(null, dir);
  },
  filename: function (req, file, callback) {
    return callback(
      null,
      file.fieldname + "-" + Date.now() + "-" + file.originalname
    );
  },
});



const S3upload = multer({
  storage: PDF_File_LocakStorage,
  limits: {
    // fileSize: size * size * 45 // we are allowing only 5 MB files
    fileSize: size * size * 23, // we are allowing only 2.5 MB files
  },
  fileFilter: (req, file, callback, res) => {
    let splitFileName = file.originalname.split(".");
    if (splitFileName.length > 2) {
      cb(null, false);
      return cb(new Error("Double extentions are not allowed"));
    } else {
      let fileExtention = splitFileName.pop();

      console.log("File Extention", fileExtention);

      if (fileExtention == "pdf" || fileExtention == ".pdf") {
        return callback(
          null,
          file.fieldname + "-" + Date.now() + "-" + file.originalname
        );
      } else {
        cb(null, false);
        return cb(new Error("Only .pdf format allowed!"));
      }
    }
  },
});

module.exports = {
  S3upload: S3upload,
};
