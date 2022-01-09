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
    storageId:{
        type:String
    }
    // UUid same or another schema...
});

module.exports = mongoose.model('UserSchema',UserSchema);