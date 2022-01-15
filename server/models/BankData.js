const mongoose = require("mongoose");

const { Schema } = mongoose;

const BankData = new Schema({
    bankId: {
        type: String,
        required:true
    },
    granted_kyc_accesses: [{ userId: String }],
    pending_kyc_accesses: [{ userId: String }]
});

module.exports = mongoose.model('BankData',BankData);