const { errHandler } = require("../utils/errHandler");
const BankData = require("../models/BankData");
const UserData = require("../models/UserData");
const UserSchema = require("../models/Users");

const requestUserKyc = async (req, res, next) => {
    try {

        const { userId, bankId } = req.body;
        // Todo logic
        // ==========> Check if userId exists in BankData database. If exists return status(user already exists)
        // ==========> else add the current bank id to pending_granted_access array in UserData;
        // await new BankData({
        //     bankId:"9876",
        //     granted_kyc_accesses: []
        // }).save();

        // await new UserData({
        //     userId:"1234",
        //     granted_kyc_access_to: [],
        //     pending_kyc_access: []
        // }).save();

        const doesUserExist = await BankData.findOne({ bankId, "granted_kyc_accesses.userId": userId }).exec();

        console.log(doesUserExist);

        if (!doesUserExist) {
            const d = await UserData.findOneAndUpdate({ userId: userId }, { $push: { "pending_kyc_access": { bankId } } }).exec();
            res.status(201).json({ message: "Request to user sent successfullly." });
            return;
        }

        res.status(200).json({ message: "User already exists" });

    } catch (err) {
        errHandler(err, next);
    }
};

const grantedBankKyc = async (req, res, next) => {
    try {

        const { userId, bankId } = req.body;

        await UserData.findOneAndUpdate({ userId }, { $push: { "granted_kyc_access_to": { bankId } }, $pull: { "pending_kyc_access": { bankId: bankId } } }).exec();
        await BankData.findOneAndUpdate({ bankId }, { $push: { "granted_kyc_accesses": { userId } } }).exec();

        res.status(201).json({ message: "Granted permission successfully." });
    } catch (err) {
        errHandler(err, next);
    }
}

const getAllGrantedUserDetails = async(req,res,next) => {
    try{
        
        const bankId = req.params.bankId;
        const userDetails = [];

        const { granted_kyc_accesses } = await BankData.findOne({ bankId: bankId }).exec();

        for(let user of granted_kyc_accesses){
            const userDetail = await UserSchema.findOne({ userId:user.userId }).select("username userId").exec();
            userDetails.push(userDetail);
        }

        res.status(200).json({ userDetails });

    }catch(err){
        errHandler(err,next);
    }
}

module.exports = { requestUserKyc, grantedBankKyc,getAllGrantedUserDetails };