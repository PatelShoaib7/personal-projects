
const { log, utils } = require("../../helpers/classes/BaseClass.js");
const { PolicyIssuanceSchema } = require("../../models/model.index.js");
const { quotationSchema } = require("../../models/user/quotationModel.js");


// const updateExistiing_AgentCode = async (req , res)=>{
//     let {filter} = req.query
//     let filter_regex = new RegExp('^(quatation|policy)$');
//    if(!filter){
// 		utils.sendResponse(req, res, 200, 4, "Filter Is Required");
//         return;
//      }
//      else if(!filter_regex.test(filter)){
// 		utils.sendResponse(req, res, 200, 4, "Invalid Filter Type Required Filter  quatation | policy");
//         return 
//      }
//      let Db_Data =[]
//      if(filter == "quatation"){
//          Db_Data  =  await quotationSchema.find({       "LOB":"Travel", 
//                                                           "agentCode":{$exists: false}},
//                                                           {_id : 1, 
//                                                             "travel_information.agentCode" : 1})

//      }
//      else if(filter == "policy"){
//          Db_Data =  await PolicyIssuanceSchema.find({"LOB":"Travel", 
//                                                         "agentCode":{$exists: false}},
//                                                         {_id : 1, 
//                                                         "travel_information.agentCode" : 1})
//      }
//        log.info("----------Db_Data Policy Data  -------------",Db_Data);
    
//     let bulkWriteObject = [];

//     for(let Policy =0; Policy < Db_Data.length; Policy++){
//     bulkWriteObject.push({
//         updateOne:{
//                 filter : {
//                     "_id": utils.castObjectId(Db_Data[Policy]._id)
//                 },
//                 update :{
//                     "agentCode":  Db_Data[Policy].travel_information.agentCode    
//                 }
//             },
//         })
//     }
//    let finalResponse = [];
//     if(filter == "quatation"){
//         finalResponse  = await  quotationSchema.bulkWrite(bulkWriteObject)
//     }
//     else if(filter == "policy"){
//         finalResponse  = await PolicyIssuanceSchema.bulkWrite(bulkWriteObject)
//     }

        
//         if(!finalResponse){
//             log.info("-----------------err=-------",finalResponse?.result)
// 		utils.sendResponse(req, res, 200, 1, "error occured");
//         return;
//         }
//         else if(finalResponse){
//             log.info("-----------------result=-------",finalResponse?.result)
// 		   utils.sendResponse(req, res, 200, -1,finalResponse?.result);
//         return;

//         }
//         else{
//             log.info("-----------------database error=-------")
// 		utils.sendResponse(req, res, 200, 4, "database error");
//         return;
//         }
// }


// module.exports ={
//     updateExistiing_AgentCode : updateExistiing_AgentCode
// }