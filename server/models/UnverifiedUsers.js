const mongoose = require("mongoose");

const { Schema } = mongoose;

const UnverifiedUsers = new Schema({
    userId:{
        type:String,
        required:true
    },
    storageId: {
        type:String,
        required:true
    }
});

module.exports = mongoose.model('UnverifiedUsers',UnverifiedUsers);