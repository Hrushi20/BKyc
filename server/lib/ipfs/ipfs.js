const { node } = require("../../utils/initEssentials");
const CryptoJs = require("crypto-js");
const { v4: uuidv4 } = require('uuid');
const { enc } = require("crypto-js");
const UnverifiedUsers = require("../../models/UnverifiedUsers");
const UserSchema = require("../../models/Users");

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
    async createUserKycHash(data){

        const ipfsData = {};

        console.log(data);
        const userId = data.userId;

        delete data.userId;

        let jsonString = JSON.stringify(data);

        // Need to update it to uuid();
        const cipherKey = uuidv4();

        const encryptedData = this.encryptUserKyc(jsonString,cipherKey);

        const userHash = await node.ipfs.add(encryptedData);

        ipfsData["cipherKey"] = cipherKey;
        ipfsData["userHash"] = userHash;

        // Delete unverified kyc...
        await UnverifiedUsers.findOneAndDelete({ userId:userId }).exec();

        // Update status of the user...
        await UserSchema.findOneAndUpdate({ userId: userId },{ status:"payment-pending" }).exec();

        
        return ipfsData;
    }

}

module.exports = { Ipfs }