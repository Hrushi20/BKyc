const mongoose = require("mongoose");

const { Schema } = mongoose;

const UsersSchema = new Schema({
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
    },
    nickname: {
        type: String
    }
});

module.exports = mongoose.model('userschemas',UsersSchema);