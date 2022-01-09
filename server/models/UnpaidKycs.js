const mongoose = require("mongoose");

const { Schema } = mongoose;

const UnpaidKycs = new Schema({
    userId:{
        type:String,
        required:true
    },
    ipfsHash: {
        type:String,
        required:true
    },
    cipherKey:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('UnpaidKycs',UnpaidKycs);