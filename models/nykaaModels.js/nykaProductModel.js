const { default: mongoose } = require("mongoose");


const nykaPrductsModel =  new mongoose.Schema({
    type :  mongoose.Schema.Types.Mixed,
    brand :{type : String}
}, { strict : false})

module.exports =  mongoose.model("nykaa_products", nykaPrductsModel)

