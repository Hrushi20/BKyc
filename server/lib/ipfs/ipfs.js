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
const KycStorageAbi = require("../../KycStorage.json");
const Web3 = require("web3");

class Ipfs {

    // Encrypting the userKyc.json file...
    encryptUserKyc(data, cipherKey) {
        return CryptoJs.AES.encrypt(data, cipherKey).toString();
    }

    // Decrypting the ifps file...
    decryptUserKyc(data, cipherKey) {
        return CryptoJs.AES.decrypt(data, cipherKey).toString(enc.Utf8);
    }

    /*
        Hashes the json data of the user...
    */
    async createUserKycHash(data, toEmail) {

        const userId = data.userId;
        delete data.userId;

        const phoneNumber = data.phoneNumber;
        const ipfsData = {};
        const jsonString = JSON.stringify(data);
        const cipherKey = uuidv4();
        const encryptedData = this.encryptUserKyc(jsonString, cipherKey);
        const userHash = await node.ipfs.add(encryptedData);

        ipfsData["userHash"] = userHash;

        // Delete unverified kyc...
        const storageDetails = await UnverifiedUsers.findOneAndDelete({ userId: userId }, { new: true }).exec();
        // Delete the storaged kyc on the server
        KycStorage.deleteFolder(storageDetails.storageId);
        // Storing the ipfs data in the db. Will be deleted after saving on the blockchain...
        await (new UnpaidKycs({
            userId,
            ipfsHash: userHash.path
        })).save();
        // await Twilio.sendMessage(cipherKey,phoneNumber);
        await sendMail(cipherKey, toEmail);
        await UserSchema.findOneAndUpdate({ userId: userId }, { status: "payment-pending" }).exec();
        return ipfsData;
    }

    static async decryptUserKycFromEthereum(kycId) {

        const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
        const key = Object.keys(KycStorageAbi.networks)[0];
        const contract = new web3.eth.Contract(KycStorageAbi.abi, KycStorageAbi.networks[key].address);
        const ethereumData = await contract.methods.getData(kycId).call();
        const encryptedKycString = await node.ipfs.object.get(ethereumData['1']);
        const dirtyKycString = new TextDecoder("utf-8").decode(encryptedKycString.Data).toString();
        // DirtyKycString is not Displaying character. TO remove error, using below regex (Dirty string displayed is ????);
        const cleanKycString = dirtyKycString.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '')
        const decryptedKycString = CryptoJs.AES.decrypt(cleanKycString, ethereumData['2']).toString(enc.Utf8);
        return JSON.parse(decryptedKycString);
    }

}

module.exports = { Ipfs }