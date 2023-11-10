const { default: mongoose } = require("mongoose");




const policyIssuanceSchema =mongoose.Schema({
    type: mongoose.Schema.Types.Mixed
})

module.exports = mongoose.model('policies', policyIssuanceSchema);