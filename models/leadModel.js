

const { default: mongoose } = require("mongoose");


const leadModel  = mongoose.Schema({
    name :{type : String},
    age :{type : String}
},{stict : false})

const leadSchema = mongoose.model('leads', leadModel);

module.exports ={
    leadSchema : leadSchema
}
