// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
//     <style>
//        #local{
//              height:30px;
//              font-size :20px;
//              margin:50px;
//              border:1px solid black;
//              margin-top: 50px;
//        }
//        #production{
//         height:15px;
//              font-size :30px;
//              margin:50px;
//              font-size :20px;
//              border:1px solid red;
//        }
//     </style>
// </head>
// <body>
//     <div style="
//         height:30px;
//         font-size :20px;
//         margin:50px;
//         border:1px solid black;
//         margin-top: 50px;
//         width: fit-content;"
//         >
//         <a class="local" href="http://localhost:5040/open/auth/google"> - Login By Google Bhaiii Local -</a>
//     </div>
   
// <br />
// <div   style="
// height:30px;
// font-size :20px;
// margin:50px;
// border:1px solid black;
// margin-top: 50px;
// width: fit-content;">
//     <a class="production" href="https://backend-personal-project-shoaib-patel.onrender.com/open/auth/google">Login By Google Bhaiii Producetion</a>
// </div>

// </body>
// </html>











// 'use strict';
// require("dotenv").config();
// const Bluebird = require('bluebird');
// const mongodb = require('mongodb');
// const { default: mongoose } = require("mongoose");
// const utils = require("../utils/utils");
// const MongoClient = mongodb.MongoClient;
// const url = process.env.MONGO_URL;
// Bluebird.promisifyAll(MongoClient);
// const { ObjectId } = require('mongodb'); // Import the ObjectId constructor from the mongodb package

// module.exports.up = async function (next) {
//     const client = await MongoClient.connect(url);
//     const db = client.db();
//     //Find-ALL-Policies-In-DB-Where-Agent-Code-Exist
//     const Db_Data = await db.collection('policies').find({"LOB": "Travel",
//                                                          "agentCode":{$exists: false}}, 
//                                                          {_id: 1, "travel_information.agentCode": 1}).toArray();
//     //console.log("---------Db_Data------",Db_Data?.length)
//  let bulkWriteObject = [];
// try{
//     for (let Policy = 0; Policy < Db_Data.length; Policy++) {
//       bulkWriteObject.push({
//         updateOne: {
//           filter: {
//             "_id": new ObjectId(Db_Data[Policy]._id)
//           },
//           update: {
//               $set: {
//                   "agentCode": Db_Data[Policy].travel_information.agentCode
//               }
//           }
//         },
//       });
//     }
//     //console.log("----------finalResponse ------", bulkWriteObject);
//     const finalResponse = await db.collection('policies').bulkWrite(bulkWriteObject);
//     console.log("----------finalResponse ------", finalResponse);
//     const latestDocument = await  db.collection('up_migrations').findOne({},{sort: {version: -1}});
//     console.log("------------latestDocument----------",latestDocument?.version)
//     let version = 1; 
//     if (latestDocument?.version > 0 && latestDocument?.version != null) {
//       version = latestDocument?.version + 1;
//     }
//     await  db.collection('up_migrations').insertOne(
//       {
//         migratedAt : new Date().toISOString(),
//         name: "UP Migration",
//         version : version,
//         document_Updated : bulkWriteObject ,
//         bulkWrite_Response :finalResponse
//       }
//     )
//     console.log("----------Up Migration Complted ------");
//     client.close();
//     return next();
//   } catch (err) {
//     console.error(err);
//     return next(err);
//   }
// };
// module.exports.down = async function (next) {
//   const client = await MongoClient.connect(url);
//   const db = client.db();
//   const Db_Data = await db.collection('policies').find({"LOB": "Travel"}, {_id: 1, "travel_information.agentCode": 1}).toArray();
//   //console.log("---------Db_Data------",Db_Data?.length)
//   let bulkWriteObject = [];
// try{
//   for (let Policy = 0; Policy < Db_Data.length; Policy++) {
//     bulkWriteObject.push({
//       updateOne: {
//         filter: {
//           "_id": new ObjectId(Db_Data[Policy]._id)
//         },
//         update: {
//             $unset: {
//                 "agentCode":1
//             }
//         }
//       },
//     });
//   }
//  // console.log("----------finalResponse ------", bulkWriteObject);
//   const finalResponse = await db.collection('policies').bulkWrite(bulkWriteObject);
//   console.log("----------finalResponse ------", finalResponse);
//   const latestDocument = await  db.collection('down_migrations').findOne({},{sort: {version: -1}});
//   console.log("------------latestDocument----------",latestDocument?.version)
//   let version = 1; 
//   if (latestDocument?.version >0 && latestDocument?.version != null) {
//     version = latestDocument?.version + 1;
//   }
//   await  db.collection('down_migrations').insertOne(
//     {
//       migratedAt : new Date().toISOString(),
//       name: "UP Migration",
//       version : version,
//       document_Updated : bulkWriteObject ,
//       bulkWrite_Response :finalResponse
//     }
//   )
//   console.log("----------Down Migration Complted ------");
//   client.close();
//   return next();
// } catch (err) {
//   console.error(err);
//   return next(err);
// }
// };

// 65634caf773d02dbe1ac3201


// "0" : ObjectId("656462226cfe1b4a946ecc07"),
// "1" : ObjectId("656462226cfe1b4a946ecc08"),
// "2" : ObjectId("656462226cfe1b4a946ecc09"),
// "3" : ObjectId("656462226cfe1b4a946ecc0a"),
// "4" : ObjectId("656462226cfe1b4a946ecc0b")