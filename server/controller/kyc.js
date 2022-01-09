const { v4: uuidv4 } = require('uuid');
const { errHandler } = require("../utils/errHandler");
const KycStore = require("../lib/kyc/kycStore");
const KycFetch = require("../lib/kyc/kycFetch");
const { Ipfs } = require("../lib/ipfs/ipfs");
const UnpaidKycs = require("../models/UnpaidKycs");

// Stores all kycs in UserData folder using uuid and store uuid in mongodb
const storeKyc = async(req,res,next) => {

    try{
        // Get the json data from client
        data = JSON.parse(req.body.body);

        // Get the pan and aadhar details
        const docs = req.files;

        // const storageId = uuidv4();
        const storageId = "92274f12-5f01-482a-9f87-a715e87b652f";
        const kycStorage = new KycStore(data,storageId,docs);
        kycStorage.store();

        res.status(201).send("<h1>Storing kyc on server... Will be updated to the blockchain</h1>");
    }catch(err){
        errHandler(err,next);
    }

};

// Get all the unverified kycs from the db
const getKycsForVerification = async(req,res,next) => {
    try{

        const kycs = await new KycFetch().fetchAllKycs();
        res.status(201).json({kycs});

    }catch(err){
        errHandler(err,next);
    }
}

const storeKycOnIpfs = async(req,res,next) => {
    try{

        const userData = req.body;

        const IPFS = new Ipfs();

        const encryptedUserData = await IPFS.createUserKycHash(userData);

        console.log(encryptedUserData);

        // Stores the encrypted data in database and change the status of the user to pending payment...

        // const data = new UnpaidKycs({
        //     userId: "j23423432",
        //     ipfsHash:encryptedUserData.userHash.path,
        //     cipherKey:encryptedUserData.cipherKey
        // })

        await data.save();
        

        res.status(200).json({"message":"Data processed successfully..."});

    }catch(err){
        errHandler(err,next);
    }
}

const rejectKyc = (req,res,next) => {

    try{

        console.log("Need  to reject userKyc")

        // Todo    logic for reject userKyc.....

        res.status(201).json({ "message":"Data processed successfully..." })

    }catch(err){
        errHandler(err,next);
    }
}

module.exports = { storeKyc,getKycsForVerification,storeKycOnIpfs,rejectKyc };