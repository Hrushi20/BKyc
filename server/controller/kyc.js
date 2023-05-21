const { errHandler } = require("../utils/errHandler");
const KycStore = require("../lib/kyc/kycStore");
const KycFetch = require("../lib/kyc/kycFetch");
const { Ipfs } = require("../lib/ipfs/ipfs");
const UserSchema = require("../models/Users");
const UnverifiedUsers = require("../models/UnverifiedUsers");

const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const twilioClient = require('twilio')("SK4d83a847d69cce1bdb5c3c24e06a6923",
    "3FwM2mkVcKMdUEQq9FbSNfl5mttzxqEO", { accountSid: "AC2afd314ab314d7d87c425a0d42a5da47" });


// Stores all kycs in UserData folder using uuid and store uuid in mongodb
const storeKyc = async(req,res,next) => {

    try{
        // Get the json data from client
        data = JSON.parse(req.body.body);

        console.log(data + " data to store kyc");
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

const scheduleAMeet = async(req,res,next) => {
    try{

        const userId = req.params.userId;

        await UnverifiedUsers.findOneAndUpdate({ userId },{ isScheduledAMeet:true }).exec();
        res.status(201).json({ message:"Meeting scheduled" });

    }catch(err){
        errHandler(err,next);
    }
}

const joiningAMeet = async(req,res,next) => {
    try{

        const identity = req.body.identity;
        const roomName = req.body.room;
        const roomList = await twilioClient.video.rooms.list({ uniqueName: roomName, status: 'in-progress' });

        let room;

        if (!roomList.length) {
            // Call the Twilio video API to create the new Go room
            room = await twilioClient.video.rooms.create({
                uniqueName: roomName,
                type: 'go'
            });
        } else {
            room = roomList[0];
        }

        const videoGrant = new VideoGrant({
            room: room.uniqueName,
        })

        // Create an access token
        const token = new AccessToken(
            "AC2afd314ab314d7d87c425a0d42a5da47",
            "SK4d83a847d69cce1bdb5c3c24e06a6923",
            "3FwM2mkVcKMdUEQq9FbSNfl5mttzxqEO"
        );

        token.addGrant(videoGrant);
        token.identity = identity;

        res.send({
            token: token.toJwt()
        });

    }catch(err){
        errHandler(err,next);
    }
}

const storeKycOnIpfs = async(req,res,next) => {
    try{


        const userData = req.body.userData;
        const toEmail = req.body.email;

        const IPFS = new Ipfs();

        const encryptedUserData = await IPFS.createUserKycHash(userData, toEmail);

        console.log("Encrypted userData ", encryptedUserData);

        //nodemailer support

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

module.exports = { storeKyc,getKycsForVerification,storeKycOnIpfs,rejectKyc,scheduleAMeet,joiningAMeet };