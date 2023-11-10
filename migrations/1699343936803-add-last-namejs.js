'use strict';
require("dotenv").config();
const Bluebird = require('bluebird');
const mongodb = require('mongodb');
const { default: mongoose } = require("mongoose");
const utils = require("../utils/utils");
const MongoClient = mongodb.MongoClient;
const url = process.env.MONGO_URL;
Bluebird.promisifyAll(MongoClient);
const { ObjectId } = require('mongodb'); // Import the ObjectId constructor from the mongodb package

module.exports.up = async function (next) {
    const client = await MongoClient.connect(url);
    const db = client.db();
    //Find-ALL-Policies-In-DB-Where-Agent-Code-Exist
    const Db_Data = await db.collection('policies').find({"LOB": "Travel",
                                                         "agentCode":{$exists: false}}, 
                                                         {_id: 1, "travel_information.agentCode": 1}).toArray();
    //console.log("---------Db_Data------",Db_Data?.length)
 let bulkWriteObject = [];
try{
    for (let Policy = 0; Policy < Db_Data.length; Policy++) {
      bulkWriteObject.push({
        updateOne: {
          filter: {
            "_id": new ObjectId(Db_Data[Policy]._id)
          },
          update: {
              $set: {
                  "agentCode": Db_Data[Policy].travel_information.agentCode
              }
          }
        },
      });
    }
    //console.log("----------finalResponse ------", bulkWriteObject);
    const finalResponse = await db.collection('policies').bulkWrite(bulkWriteObject);
    console.log("----------finalResponse ------", finalResponse);
    const latestDocument = await  db.collection('up_migrations').findOne({},{sort: {version: -1}});
    console.log("------------latestDocument----------",latestDocument?.version)
    let version = 1; 
    if (latestDocument?.version > 0 && latestDocument?.version != null) {
      version = latestDocument?.version + 1;
    }
    await  db.collection('up_migrations').insertOne(
      {
        migratedAt : new Date().toISOString(),
        name: "UP Migration",
        version : version,
        document_Updated : bulkWriteObject ,
        bulkWrite_Response :finalResponse
      }
    )
    console.log("----------Up Migration Complted ------");
    client.close();
    return next();
  } catch (err) {
    console.error(err);
    return next(err);
  }
};
module.exports.down = async function (next) {
  const client = await MongoClient.connect(url);
  const db = client.db();
  const Db_Data = await db.collection('policies').find({"LOB": "Travel"}, {_id: 1, "travel_information.agentCode": 1}).toArray();
  //console.log("---------Db_Data------",Db_Data?.length)
  let bulkWriteObject = [];
try{
  for (let Policy = 0; Policy < Db_Data.length; Policy++) {
    bulkWriteObject.push({
      updateOne: {
        filter: {
          "_id": new ObjectId(Db_Data[Policy]._id)
        },
        update: {
            $unset: {
                "agentCode":1
            }
        }
      },
    });
  }
 // console.log("----------finalResponse ------", bulkWriteObject);
  const finalResponse = await db.collection('policies').bulkWrite(bulkWriteObject);
  console.log("----------finalResponse ------", finalResponse);
  const latestDocument = await  db.collection('down_migrations').findOne({},{sort: {version: -1}});
  console.log("------------latestDocument----------",latestDocument?.version)
  let version = 1; 
  if (latestDocument?.version >0 && latestDocument?.version != null) {
    version = latestDocument?.version + 1;
  }
  await  db.collection('down_migrations').insertOne(
    {
      migratedAt : new Date().toISOString(),
      name: "UP Migration",
      version : version,
      document_Updated : bulkWriteObject ,
      bulkWrite_Response :finalResponse
    }
  )
  console.log("----------Down Migration Complted ------");
  client.close();
  return next();
} catch (err) {
  console.error(err);
  return next(err);
}
};

