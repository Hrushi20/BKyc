const { node } = require("../../utils/initEssentials");
const CryptoJs = require("crypto-js");
const { v4: uuidv4 } = require('uuid');
const { enc } = require("crypto-js");
const UnverifiedUsers = require("../../models/UnverifiedUsers");
const UserSchema = require("../../models/Users");
const UnpaidKycs = require("../../models/UnpaidKycs");
const KycStorage = require("../kyc/kycStore");
const Twilio = require("../twilio/twilio.js");
const { sendMail } = require("../nodemailer/nodemailer");

class Ipfs {

    // Encrypting the userKyc.json file...
    encryptUserKyc(data,cipherKey){
        return CryptoJs.AES.encrypt(data,cipherKey).toString();
    }

    // Decrypting the ifps file...
    decryptUserKyc(data,cipherKey){
        return CryptoJs.AES.decrypt(data,cipherKey).toString(enc.Utf8);
    }

    /*
        Hashes the json data of the user...
    */
    async createUserKycHash(data, toEmail){

        const userId = data.userId;
        delete data.userId;

        const phoneNumber = data.phoneNumber;
        const ipfsData = {};
        const jsonString = JSON.stringify(data);
        const cipherKey = uuidv4();
        const encryptedData = this.encryptUserKyc(jsonString,cipherKey);
        const userHash = await node.ipfs.add(encryptedData);

        ipfsData["cipherKey"] = cipherKey;
        ipfsData["userHash"] = userHash;

        // Delete unverified kyc...
        const storageDetails = await UnverifiedUsers.findOneAndDelete({ userId:userId },{ new:true }).exec();
        // Delete the storaged kyc on the server
        KycStorage.deleteFolder(storageDetails.storageId);
        // Storing the ipfs data in the db. Will be deleted after saving on the blockchain...
        await (new UnpaidKycs({
            userId,
            ipfsHash:userHash.path
        })).save();
        await Twilio.sendMessage(cipherKey,phoneNumber);
        await sendMail(cipherKey,toEmail);
        await UserSchema.findOneAndUpdate({ userId: userId },{ status:"payment-pending" }).exec();
        return ipfsData;
    }

}

module.exports = { Ipfs }