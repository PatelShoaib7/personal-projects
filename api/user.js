"use strict";
const cloudinary = require("cloudinary");
const fs = require("fs");
const userSchema = require("../models/userModel");
const utils = require("../utils/utils");
const { mergePDF_Func } = require("./pdf-merger/mergePdf");
const { default: axios } = require("axios");
const nykaPrductsModel = require("../models/nykaaModels.js/nykaProductModel");
const PolicyIssuanceSchema = require("../models/PolicyIssuanceSchema");
const { default: mongoose } = require("mongoose");
const { leadSchema } = require("../models/leadModel");
const { activityTracker_Schema } = require("../models/TrackerModel");
var async = require("async");
const patternRegex = require("./patternRegex");

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


const Nyaka_Products_Data  =async (req , res )=>{
  
     const BulkQuries  =[];
      
   let URL = 'http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline'
   const Products_Data_Form_API =   await axios.get(URL)
                                     .then((response)=>{
                                      return response.data
                                      })
                                     .catch((error)=>{
                                      return error
                                     })
                                     console.log("---Products_Data_Form_API----",Products_Data_Form_API.length)
//  res.send(Products_Data_Form_API)   

   for(let  i = 0; i<Products_Data_Form_API.length; i++){
    delete Products_Data_Form_API[i].id
        var insertThisProduct_Data = {
                "brand":Products_Data_Form_API[i].brand,
                ...Products_Data_Form_API[i]
         };
         BulkQuries.push({ 
                         insertOne : 
                                    {
                                      document : insertThisProduct_Data
                                    }
                         })
     }
  console.log()
   const BulkReponse = await nykaPrductsModel.bulkWrite(BulkQuries)
   
     console.log("----BulkReponse---",BulkReponse)
  res.send(BulkReponse)
    }




 const DataBase_Facet_Pipeline = async (req , res )=>{
//{"CTPL_VehicalInfo_for_Policy.modelYear" : {$gte : "2023"}
//
//
//
//

  const Data  = await PolicyIssuanceSchema.aggregate([
    {  //Here facet pipeline  == async.series   --  will execute quierie one by one eith match opeorator
      $facet : {
           Travel :[
            {
              $match :{
                "LOB" :"Travel"
              }
            },
           ],
           CTPL : [
            {
              $match :{
                "LOB" :"Travel"
              }
            },
           ],
           Motor :[
            {
              $match :{
                "LOB": "Motor"
              }
            },
           ],
           Counts: [
            {
              $match :{
                "LOB":"CTPL"
              }
            },
            { $sort : { "createdAt": -1 } },
            { $limit : 5 },
            {
              $count : "Ctpl_count"
            } 
           ]
           
      }
    }
  ])
                    //.find({}, 
                    //  {
                    //   _id: 0,
                    //   // LOB: 1,
                    //   quotationNumber: 1,
                    //   leadId : 1,
                    //   userId: 1,
                    //   createdAt : 1,
                    //   updatedAt : 1,
                    //   CTPL_VehicalInfo_for_Policy :1
                    // })
                    //.limit(5).skip(5)
      return utils.sendResponse(req, res, 200,`PDF Merged Successfully ${Data.length}` ,Data);

 }


 const DataBase_FacetPipeline_With_LookupWindUNwindProject  = async(req , res)=>{


  const Data  =await  PolicyIssuanceSchema.aggregate([
                                                        {
                                                           $facet : {
                                                                "policyData":[
                                                                  {
                                                                     $match :{
                                                                              "_id":new mongoose.Types.ObjectId("6547a062b5e721a0476da34d")
                                                                        }
                                                                 },
                                                                 {
                                                                  $lookup :{
                                                                    from : "users",
                                                                    let : {foreignField: '$_id'},
                                                                    //localField:"userId",
                                                                    pipeline :[
                                                                      { $match :{ $expr  :{ $eq :[  "$_id" ,"$foreignField" ]}}},
                                                                      { $project: { _id: 1,
                                                                                   primary_email: 1, 
                                                                                   name: { $concat: ["$first_name", " ", "$last_name"] },
                                                                                   //agent_id: 1, mobile_no: 1
                                                                                   } 
                                                                                  },
                                                                    ],
                                                                      as: 'Policy_ByAgent'
                                                                  },
                                                                 },
                                                               
                                                                ]
                                                                // ,
                                                                //  "TravelData_Count" :[
                                                                //   {
                                                                //     $match   :{
                                                                //               "LOB":"Travel"  
                                                                //     }
                                                                //   },{
                                                                //     $count :"TravelData_Count"                                                                  }
                                                                //  ]
                                                        },
                                                        
                                                      }])
                                                      console.log("----Data from DB --",Data[0].policyData)
      return utils.sendResponse(req, res, 200,`PDF Merged Successfully` ,Data);

 }

const UpdateExistingDateOfStringFormat =()=>{

}

const _ = require('lodash');


const getProductionReportTillGivenDates = async (req, res) => {
    let { fromDate, uptoDate } = req.query;
  
    console.log("--req.query --", fromDate, uptoDate);
  
    if (!fromDate) {
      utils.sendResponse(req, res, 200, 1, "Mandatory filed fromDate not found");
      return;
    }
    if (!uptoDate) {
      utils.sendResponse(req, res, 200, 1, "Mandatory filed uptoDate not found");
      return;
    }
  
    if (!patternRegex.MILISECOND_DATE.test(fromDate)) {
      utils.sendResponse(req, res, 200, 236, "Invalid fromDate Key");
      return;
    }
    if (!patternRegex.MILISECOND_DATE.test(uptoDate)) {
      utils.sendResponse(req, res, 200, 236, "Invalid uptoDate Key");
      return;
    }
    parseInt(fromDate); //fromDate
    parseInt(uptoDate); //uptoDate
  
    //get all date Object Details
    // let fromDate_dateObject = new Date(fromDate);
    // let uptoDate_dateObject = new Date(uptoDate)
  
    //Convert to ISO
    const fromDate_dateObjectString = new Date(parseInt(fromDate)).toISOString();
    const uptoDate_dateObjectString = new Date(parseInt(uptoDate)).toISOString();
  
    //Actual ISO Date Required
    const ISO_fromDate = `ISODate("${fromDate_dateObjectString}")`;
    const ISO_uptoDate = `ISODate("${uptoDate_dateObjectString}")`;
  
    console.log("----ISO DATE FROM -----", ISO_fromDate);
    console.log("----ISO DATE TO -----", ISO_uptoDate);
  
    const commonQuery_ForAll = [
      {
        $project: {
          formattedDate: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: {
                $toDate: {
                  $multiply: ["$created_date", 1], // Convert milliseconds to seconds
                },
              },
            },
          },
        },
      },
      {
        $sort: {
          formattedDate: 1, // 1 for ascending order, -1 for descending order
        },
      },
      {
        $group: {
          _id: "$formattedDate",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1, // 1 for ascending order, -1 for descending order
        },
      },
      {
        $project: {
          _id: 1,
          count: 1,
        },
      },
    ];
  
    const DataFrom_DB = await async.parallel(
      {
        userLogins: async () => {
          console.log("---- userLogins execution ---");
          const logindata = await activityTracker_Schema.aggregate([
            {
              $match: {
                type: "User Login Tracker",
                created_date: {
                  $gte: parseInt(fromDate),
                  $lte: parseInt(uptoDate),
                },
              },
            },
            ...commonQuery_ForAll,
          ]);
          return logindata;
        },
        leadsCreated: async () => {
          console.log("---- leadsCreated execution ---");
          let leadsCreateddata = await leadSchema.aggregate([
            {
              $match: {
                created_date: {
                  $gte: parseInt(fromDate),
                  $lte: parseInt(uptoDate),
                },
              },
            },
            ...commonQuery_ForAll,
          ]);
          return leadsCreateddata;
        },
        proposalConverted: async () => {
          console.log("---- proposalConverteddata execution ---");
          let proposalConverteddata = await leadSchema.aggregate([
            {
              $match: {
                isPolicyIssued: true,
                created_date: {
                  $gte: parseInt(fromDate),
                  $lte: parseInt(uptoDate),
                },
              },
            },
            ...commonQuery_ForAll,
          ]);
          //console.log("---- proposalConverteddata result ---",proposalConverteddata)
  
          return proposalConverteddata;
        },
         policiesIssued: async () => {
        //   console.log("---- policiesData execution ---")
  
        //   const [,...queryToGetPolicyData] =commonQuery_ForAll
        //   let policiesData = await policyIssuanceSchema.aggregate([
        //     {
        //       $match :{
        //         "createdAt" : {$gte : ISO_fromDate, $lte: ISO_uptoDate}
        //       }
        //     },
        //     {
        //       $project: {
        //         formattedDate: {
        //           $dateToString: {
        //             format: "%Y-%m-%d",
        //             date :"$createdAt"
        //           }
        //         }
        //       }
        //     },
        //     ...queryToGetPolicyData
        //   ]);
        // //  console.log("---- policiesData execution ---",policiesData)
        //   return policiesData
         },
      },
      function (err, results) {
        // results is now equals to: {one: 1, two: 2}
        if (err) {
          utils.sendResponse(req, res, 200, 1, err);
        }
        console.log("---- Final result of production report data ----- ", results);
        // utils.sendResponse(req, res, 200, -1, results);
      }
    );
  };


  module.exports = {
  checkWorking: checkWorking,
  colletUserData: colletUserData,
  UploadPDF_S: UploadPDF_S,
  mergeAllPDF: mergeAllPDF,
  Nyaka_Products_Data:Nyaka_Products_Data,
  DataBase_Facet_Pipeline : DataBase_Facet_Pipeline,
  DataBase_FacetPipeline_With_LookupWindUNwindProject : DataBase_FacetPipeline_With_LookupWindUNwindProject,
  UpdateExistingDateOfStringFormat : UpdateExistingDateOfStringFormat,
  getProductionReportTillGivenDates : getProductionReportTillGivenDates
};
