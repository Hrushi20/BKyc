const { errHandler } = require("../utils/errHandler");
const BankFunc = require("../lib/Bank/Bank")

const requestUserKyc = async (req, res, next) => {
    try {
        const { userId,bankId } = req.body;
        await BankFunc.requestUserKyc(userId,bankId); 
        res.status(200).json({ message:"Request to user sent successfully." });
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

const rejectBankKyc = async (req,res,next) => {
    try{
        const { userId,bankId } = req.body;
        await BankFunc.rejectBankKyc(userId,bankId);
        res.status(201).json({ message:`Rejected bank ${bankId} permission to grant kyc.` });

    }catch(err){
        errHandler(err,next);
    }
}

const terminateBankKyc = async (req,res,next) => {
    try{
        const { userId,bankId } = req.body;
        await BankFunc.terminateBankKyc(userId,bankId);
        res.status(201).json({ message:"Terminated access to bank successfully." })

    }catch(err){
        errHandler(err,next);
    }
}

const getAllUserDetails = async(req,res,next) => {
    try{
        const bankId = req.params.bankId;
        console.log("bankId", bankId);
        const userDetails = await BankFunc.getAllUserDetails(bankId);
        console.log("users : ", userDetails);
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


module.exports = { requestUserKyc, grantedBankKyc,getAllUserDetails,getAllBankStatus,rejectBankKyc,terminateBankKyc };