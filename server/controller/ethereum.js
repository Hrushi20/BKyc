const UnPaidKycs = require("../models/UnpaidKycs");
const UserSchema = require("../models/Users");
const { errHandler } = require("../utils/errHandler");

const getHashedKyc = async(req,res,next) => {
    
    try{
        const userId = req.params.userId;
        const { ipfsHash }  = await UnPaidKycs.findOne({ userId }).exec();
        res.status(200).json({ ipfsHash });
    }catch(err){
        errHandler(err,next);
    }
}

const kycStoredOnBlockchainSuccess = async(req,res,next) => {
    try{

        const userId = req.params.userId;
        const { status } = await UserSchema.findOneAndUpdate({ userId },{ status:"verified" },{ new:true }).exec();
        await UnPaidKycs.findOneAndDelete({ userId }).exec();
        res.status(200).json({ status:status });

    }catch(err){
        errHandler(err,next);
    }
}

const getKycofUserForBank = (req,res,next) => {
    try{
        // Todo
        //      ====> Neeed to get kyc of user from ethereum blockchain
        //      ====> Neeed to decrypt the data on server and display the data to the bank...
        //      ====> Also show the ethereum blockchain response to the user, so that they can believe the data is truly from the blockchain.

    }catch(err){
        errHandler(err,next);
    }
}

module.exports = { getHashedKyc,kycStoredOnBlockchainSuccess,getKycofUserForBank };