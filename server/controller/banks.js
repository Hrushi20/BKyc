const { errHandler } = require("../utils/errHandler");
const BankFunc = require("../lib/Bank/Bank")

const requestUserKyc = async (req, res, next) => {
    try {
        const { userId,bankId } = req.body;
        const doesUserExists = BankFunc.requestUserKyc(userId,bankId); 
        if(!doesUserExists){
            res.status(200).json({ message:"Request to user sent successfully." });
        }

        res.status(200).json({ message: "User already exists" });
    } catch (err) {
        errHandler(err, next);
    }
};

const grantedBankKyc = async (req, res, next) => {
    try {
        const { userId, bankId } = req.body;
        await BankFunc.grantedBankKyc(userId,bankId);
        res.status(201).json({ message: "Granted permission successfully." });
    } catch (err) {
        errHandler(err, next);
    }
}

const getAllGrantedUserDetails = async(req,res,next) => {
    try{
        const bankId = req.params.bankId;
        const userDetails = await BankFunc.getAllGrantedUserDetails(bankId);
        res.status(201).json({ userDetails });
    }catch(err){
        errHandler(err,next);
    }
}

const getAllBankStatus = async(req,res,next) => {
    try{
        const userId = req.params.userId;
        const userKycStatus = await BankFunc.getAllBankStatus(userId);
        res.status(200).json({ ...userKycStatus });
    }catch(err){
        errHandler(err,next);
    }
}


module.exports = { requestUserKyc, grantedBankKyc,getAllGrantedUserDetails,getAllBankStatus };