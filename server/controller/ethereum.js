const { Ipfs } = require("../lib/ipfs/ipfs");
const UnPaidKycs = require("../models/UnpaidKycs");
const UserSchema = require("../models/Users");
const { errHandler } = require("../utils/errHandler");

const getHashedKyc = async (req, res, next) => {

    try {
        const userId = req.params.userId;
        const { ipfsHash } = await UnPaidKycs.findOne({ userId }).exec();
        res.status(200).json({ ipfsHash });
    } catch (err) {
        errHandler(err, next);
    }
}

const kycStoredOnBlockchainSuccess = async (req, res, next) => {
    try {

        const userId = req.params.userId;
        const { status } = await UserSchema.findOneAndUpdate({ userId }, { status: "verified" }, { new: true }).exec();
        await UnPaidKycs.findOneAndDelete({ userId }).exec();
        res.status(200).json({ status: status });

    } catch (err) {
        errHandler(err, next);
    }
}

const getKycofUserForBank = async(req, res, next) => {
    try {
        const kycId = req.params.kycId;
        const decryptedUserKyc = await Ipfs.decryptUserKycFromEthereum(kycId);
        res.status(200).json({ decryptedKyc:"Will decrypt and send the data",decryptedUserKyc });
    } catch (err) {
        errHandler(err, next);
    }
}

module.exports = { getHashedKyc, kycStoredOnBlockchainSuccess, getKycofUserForBank };