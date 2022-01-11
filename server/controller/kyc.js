const { errHandler } = require("../utils/errHandler");
const KycStore = require("../lib/kyc/kycStore");
const KycFetch = require("../lib/kyc/kycFetch");
const { Ipfs } = require("../lib/ipfs/ipfs");
const { sendMail } = require('../lib/nodemailer/nodemailer');
const UserSchema = require("../models/Users");

// Stores all kycs in UserData folder using uuid and store uuid in mongodb
const storeKyc = async(req,res,next) => {

    try{
        // Get the json data from client
        data = JSON.parse(req.body.body);

        // Get the pan and aadhar details
        const docs = req.files;
        const kycStorage = new KycStore(data,docs);
        const userStatus = await kycStorage.store();

        res.status(201).json({ message:"Kyc submitted successfully.", ...userStatus});

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

        const userData = req.body.userData;
        const toEmail = req.body.email;

        const IPFS = new Ipfs();

        const encryptedUserData = await IPFS.createUserKycHash(userData);

        console.log(encryptedUserData);

        //nodemailer support
        await sendMail(toEmail);

        // Twilio message to notify user about payment...

        res.status(200).json({"message":"Data processed successfully..."});

    }catch(err){
        errHandler(err,next);
    }
}

const rejectKyc = async(req,res,next) => {

    try{

        const { userId } = req.body;

        await UserSchema.findOneAndUpdate({ userId }, { status:"rejected" });

        // Need to decide if we need to delete the users existsing folder...
        // Twilio message to user to know that the kyc has been rejected...

        res.status(201).json({ "message":"Data processed successfully..." })

    }catch(err){
        errHandler(err,next);
    }
}

module.exports = { storeKyc,getKycsForVerification,storeKycOnIpfs,rejectKyc };