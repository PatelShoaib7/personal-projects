"use strict";

const express = require("express");
const { S3uplaod } = require("../middleware/upload");
const upload_pdf = require("../middleware/upload");
const userRoutes = express.Router();
const cloudinary = require("cloudinary");
const user = require("../api/user");
const allEmailCode = require("../utils/all-email");

userRoutes.get("/home", user.checkWorking);
userRoutes.post("/add/user", user.colletUserData);

//UPLOAD-FILE-TO-S3
 userRoutes.post("/merge/single/uplaodPdf",upload_pdf.S3upload.single("file"),user.UploadPDF_S);

//MERGE-CODE
userRoutes.get("/mergeAllPDF", user.mergeAllPDF);

//

//sendEmailTo
userRoutes.get("/send/email", allEmailCode.sendEmail_Funationality);


//send OTP --- Generate_OTP
userRoutes.get("/send/otp", allEmailCode.sendOTP_ON_Email);




//NYKAA  - - - - - - - PRODUCTS
userRoutes.get("/nykaa/products", user.Nyaka_Products_Data);

//DataBase Learning Likesh Shared Link
//Facet-Pipeline   --- Async,series
userRoutes.get("/database/learning", user.DataBase_Facet_Pipeline);

//facet  with lookup wind unwind project
userRoutes.get("/database/facet/lookup", user.DataBase_FacetPipeline_With_LookupWindUNwindProject);


//update existing string date into Actual Date Format
userRoutes.get("/update/dates/from/string-to-date", user.UpdateExistingDateOfStringFormat);


//Get Production DataBase Report   ---> getProductionReportTillGivenDate
//userRoutes.get("/get/production/report", user.getProductionReportTillGivenDates);

module.exports = {
  userRoutes: userRoutes,
};
