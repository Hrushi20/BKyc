const mongoose = require("mongoose");

const { Schema } = mongoose;

const MessageSchema = new Schema ({
    email : {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
    }
});


module.exports = mongoose.model('MessageSchema', MessageSchema);