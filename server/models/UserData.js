const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserData = new Schema({
    userId: {
        type: String,
        required: true
    },
    granted_kyc_access_to: [{ bankId: String }],
    pending_kyc_access: [{ bankId: String }]
});

module.exports = mongoose.model('UserData', UserData);