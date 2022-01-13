const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type:String,
        required:true
    },
    status: {
        type:String,
        required:true
    },
    userId:{
        type:String
    },
    role:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('UserSchema',UserSchema);