const BankData = require("../../models/BankData");
const UserData = require("../../models/UserData");
const UserSchema = require("../../models/Users");

module.exports = class Bank {

    static async requestUserKyc(userId, bankId) {
        let doesUserExists = true;
        let user = await BankData.findOne({ bankId, "granted_kyc_accesses.userId": userId }).exec();
        console.log(user);
        if (!user) {
            await UserData.findOneAndUpdate({ userId: userId }, { $push: { "pending_kyc_access": { bankId } } }).exec();
            doesUserExists = false;
        }
        return doesUserExists;
    }
    static async grantedBankKyc(userId,bankId){

        await UserData.findOneAndUpdate({ userId }, { $push: { "granted_kyc_access_to": { bankId } }, $pull: { "pending_kyc_access": { bankId: bankId } } }).exec();
        await BankData.findOneAndUpdate({ bankId }, { $push: { "granted_kyc_accesses": { userId } } }).exec();

    }

    static async getAllGrantedUserDetails (bankId) {
        const userDetails = [];
        const { granted_kyc_accesses } = await BankData.findOne({ bankId: bankId }).exec();
        for(let user of granted_kyc_accesses){
            const userDetail = await UserSchema.findOne({ userId:user.userId }).select("username userId -_id").exec();
            userDetails.push(userDetail);
        }

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