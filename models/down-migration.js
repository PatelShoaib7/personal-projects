const mongoose = require('mongoose');

const migrationSchema = new mongoose.Schema({
   version:{
    type: Number,
    default: 1 // Initial schema version}
   },
   migratedAt: { type: Date, default: Date.now },
   name:{type : String , required:true},
   document_Updated :{type : String , required:true},
   bulkWrite_Response :{type : String , required:true}
});

const DOWN_MigrationModel = mongoose.model('down_migrations', migrationSchema);

module.exports = UP_MigrationModel;
