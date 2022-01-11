const UnPaidKycs = require("../models/UnpaidKycs");
const UserSchema = require("../models/Users");
const { errHandler } = require("../utils/errHandler");

const getHashedKyc = async(req,res,next) => {
    
    try{

        const { userId } = req.body;
        const { cipherKey,ipfsHash }  = await UnPaidKycs.findOne({ userId }).exec();
        res.status(200).json({ cipherKey,ipfsHash });
    }catch(err){
        errHandler(err,next);
    }
}

const kycStoredOnBlockchainSuccess = async(req,res,next) => {
    try{

        const { userId } = req.body;

        const { status } = await UserSchema.findOneAndUpdate({ userId },{ status:"verified" },{ new:true }).exec();

        await UnPaidKycs.findOneAndDelete({ userId }).exec();

        res.status(200).json({ status:status });

    }catch(err){
        errHandler(err,next);
    }
}

module.exports = { getHashedKyc,kycStoredOnBlockchainSuccess };