const { default: mongoose } = require("mongoose");


const activityTracker_Model = mongoose.Schema({
     // agent_code : {type :String},
    // activityID : {type :String , unique: true},
    activityID : {type :String , max: 250},
    Designation : {type :String , max: 250},
},{strict : false})



const activityTracker_Schema = mongoose.model('tracker', activityTracker_Model);

module.exports ={
    activityTracker_Schema : activityTracker_Schema
}
