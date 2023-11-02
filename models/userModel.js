const mongoose = require('mongoose')

const userSchema =  mongoose.Schema({
    type :  mongoose.Schema.Types.Mixed
}, {strict : false})

module.exports = mongoose.model('users', userSchema);