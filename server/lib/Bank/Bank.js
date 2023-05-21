const BankData = require("../../models/BankData");
const UserData = require("../../models/UserData");
const UserSchema = require("../../models/Users");

module.exports = class Bank {

    static async requestUserKyc(userId, bankId) {
            await UserData.findOneAndUpdate({ userId: userId }, { $push: { "pending_kyc_access": { bankId } } }).exec();
            await BankData.findOneAndUpdate({ bankId: bankId }, { $push: { "pending_kyc_accesses": { userId } } }).exec();
    }
    
    static async grantedBankKyc(userId,bankId){

        await UserData.findOneAndUpdate({ userId }, { $push: { "granted_kyc_access_to": { bankId } }, $pull: { "pending_kyc_access": { bankId } } }).exec();
        await BankData.findOneAndUpdate({ bankId }, { $push: { "granted_kyc_accesses": { userId } }, $pull: { "pending_kyc_accesses": { userId } } }).exec();

    }

    static async rejectBankKyc(userId,bankId){

        await UserData.findOneAndUpdate({ userId }, { $pull: { "pending_kyc_access": { bankId } } }).exec();
        await BankData.findOneAndUpdate({ bankId }, { $pull: { "pending_kyc_accesses": { userId } } }).exec();

    }

    static async terminateBankKyc(userId,bankId){

        await UserData.findOneAndUpdate({ userId }, { $pull: { "granted_kyc_access_to": { bankId } } }).exec();
        await BankData.findOneAndUpdate({ bankId }, { $pull: { "granted_kyc_accesses": { userId } } }).exec();

    }

    static async getAllUserDetails (bankId) {
        const granteduserDetails = [];
        const pendinguserDetails = [];
        let details = await BankData.findOne({ bankId }).exec();
        if(!details) {
             const bank = new BankData ({
                 bankId, 
                 granted_kyc_accesses: [],
                 pending_kyc_accesses: []
             });
             await bank.save();
             details = await BankData.findOne({ bankId }).exec();
        }
        for(let user of details.granted_kyc_accesses){
            const userDetail = await UserSchema.findOne({ userId:user.userId }).select("username userId -_id").exec();
            granteduserDetails.push(userDetail);
        }
        for(let user of details.pending_kyc_accesses){
            const userDetail = await UserSchema.findOne({ userId:user.userId }).select("username userId -_id").exec();
            pendinguserDetails.push(userDetail);
        }

        const userDetails = { 'granteduserDetails': granteduserDetails, 'pendinguserDetails': pendinguserDetails  }
        return userDetails;
    }
    
    static async getAllBankStatus(userId){
        const userKycStatus = {};
        const { pending_kyc_access,granted_kyc_access_to } = await UserData.findOne({ userId }).select("pending_kyc_access granted_kyc_access_to _id").exec();
        userKycStatus["approved"] = granted_kyc_access_to;
        userKycStatus["pending"] = pending_kyc_access;

        return userKycStatus;
    }

}