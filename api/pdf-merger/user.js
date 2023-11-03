"use strict";
const cloudinary = require("cloudinary");
const fs = require("fs");
const userSchema = require("../../models/userModel");
const utils = require("../../utils/utils");
const { mergePDF_Func } = require("./mergePdf");

const checkWorking = (req, res) => {
  utils.sendResponse(req, res, 200, "Hellow World !", [
    { Sucess: "Yes You Got It !" },
  ]);
};

const colletUserData = async (req, res) => {
  let { Email, name } = req.body;
  if (!Email) {
    res.send({ errMsg: "Plz Enter Valid Email" });
  }
  let userExist = await userSchema.find({ Email: Email });

  if (userExist.length) {
    res.send({
      errMsg: "User With Email Id Already Exits Please Use Diffrnet ID",
    });
  }
  let user = await userSchema.create({
    "personalInfo.Email": Email,
  });

  if (!user) {
    res.send({ errMsg: "Data Base Error" });
  }
  res.send({ errMsg: "user sucessfully" });
};

const UploadPDF_S = async (req, res) => {
  if (!req.file) {
    return utils.sendResponse(req, res, 200, "File Is Required");
  }
  try {
    const path = req.file.path;
    const uniqueFilename = new Date().toISOString();

    //-------------------    UPLOAD DATA TO CLOUDINARY    -------------------

    cloudinary.v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });

    cloudinary.v2.uploader.upload(path, async function (err, result) {
      console.log("-----------------Execution Block----------------");

      if (err) {
        console.log("------------Error occurred-----------", err);
        return utils.sendResponse(
          req,
          res,
          200,
          "! Ooops Something Went Wrong",
          [{ error: err }]
        );
      } else {
        console.log("---------------File uploaded to Cloudinary-------------");
        // remove file from server
        fs.unlinkSync(path);

        return utils.sendResponse(req, res, 200, "PDF Uploaded Successfully", [
          {
            file: result?.url,
            secure_url: result?.secure_url,
            asset_id: result?.asset_id,
            public_id: result?.public_id,
            version_id: result?.version_id,
            format: result?.format,
          },
        ]);
      }
    });
  } catch (error) {
    return utils.sendResponse(req, res, error.errCode, error);
  }
};
const mergeAllPDF = async (req, res) => {
  let arr = [
    "https://res.cloudinary.com/dse85ip1r/image/upload/v1695108159/asss2jsr3y0lc8xmva7p.pdf",
    "https://res.cloudinary.com/dse85ip1r/image/upload/v1695108159/asss2jsr3y0lc8xmva7p.pdf",
    "https://res.cloudinary.com/dse85ip1r/image/upload/v1695108159/asss2jsr3y0lc8xmva7p.pdf",
    "https://res.cloudinary.com/dse85ip1r/image/upload/v1695108159/asss2jsr3y0lc8xmva7p.pdf",
    "https://res.cloudinary.com/dse85ip1r/image/upload/v1695108159/asss2jsr3y0lc8xmva7p.pdf",
  ];
  let data = await mergePDF_Func(arr);

  //Upload BINARAY TO CLOUDNAIRY AND GET CDN LINK

  await getCDNurlFromBianarydata(data)
    .then((cdbLink) => {
      return utils.sendResponse(req, res, 200,"PDF Merged Successfully" ,cdbLink.secure_url);

    })
    .catch((error) => {
      return utils.sendResponse(req, res, error.errCode, error);

    });
};
module.exports = {
  checkWorking: checkWorking,
  colletUserData: colletUserData,
  UploadPDF_S: UploadPDF_S,
  mergeAllPDF: mergeAllPDF,
};
