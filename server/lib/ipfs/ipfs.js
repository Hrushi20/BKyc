const { node } = require("../../utils/initEssentials");
const CryptoJs = require("crypto-js");
const { v4: uuidv4 } = require('uuid');
const { enc } = require("crypto-js");

class Ipfs {

    encryptUserKyc(data,cipherKey){
        return CryptoJs.AES.encrypt(data,cipherKey).toString();
    }

    decryptUserKyc(data,cipherKey){
        return CryptoJs.AES.decrypt(data,cipherKey).toString(enc.Utf8);
    }

    /*
        Hashes the json data of the user...
    */
    async createUserKycHash(data){

        const ipfsData = {};

        let jsonString = JSON.stringify(data);

        // Need to update it to uuid();
        const cipherKey = "92274f12-5f01-482a-9f87-a715e87b652f";

        const encryptedData = this.encryptUserKyc(jsonString,cipherKey);

        const userHash = await node.ipfs.add(encryptedData);

        ipfsData["cipherKey"] = cipherKey;
        ipfsData["userHash"] = userHash;
        
        return ipfsData;
    }

}

module.exports = { Ipfs }