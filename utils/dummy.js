'use strict'
require("dotenv").config();
  const Bluebird = require('bluebird')
  const mongodb = require('mongodb');
const { default: mongoose } = require("mongoose");
  const MongoClient = mongodb.MongoClient
  const url = process.env.MONGO_URL





console.log("----------up migration script runnig ------")
  let mClient = null
  return MongoClient.connect(url)
  .then(client => {
    mClient = client
    return client.db();
  })
  .then( async (db) => {
    Bulk_Data_Uplaod()
  })
  .then(() => {
    mClient.close()
    return next()
  })
   .catch(err => next(err))


// const Bulk_Data_Uplaod = async ()=>{
//     const Db_Data = await mongoose
//     .connection
//     .db
//     .collection('statemaster').collection('policies').find({"LOB":"Travel", 
//     "agentCode":{$exists: false}},
//     {_id : 1, 
//     "travel_information.agentCode" : 1})
  
//   let bulkWriteObject = [];
//   console.log("----------Db_Data ------",Db_Data)
  
  
//   for(let Policy =0; Policy < Db_Data.length; Policy++){
//   bulkWriteObject.push({
//   updateOne:{
//   filter : {
//   "_id": utils.castObjectId(Db_Data[Policy]._id)
//   },
//   update :{
//   "agentCode":  Db_Data[Policy].travel_information.agentCode    
//   }
//   },
//   })
//   }
//   console.log("----------bulkWriteObject ------",bulkWriteObject)
  
//   finalResponse  = await await mongoose
//   .connection
//   .db
//   .collection('statemaster').collection('policies').bulkWrite(bulkWriteObject)
//   console.log("----------finalResponse ------",finalResponse)
//   return 
//   }