const fs = require("fs/promises");
const { v4: uuidv4 } = require('uuid');
const { errHandler } = require("../utils/errHandler");

const KycStorage = require("../lib/kycStorage/kycStorage");

const storeKyc = (req,res,next) => {

    try{
        // Get the json data from client
        data = JSON.parse(req.body.body);

        // Get the pan and aadhar details
        const files = req.files;

        // const uId = uuidv4();
        const uId = "92274f12-5f01-482a-9f87-a715e87b652f";
        const kycStorage = new KycStorage(data,uId,files);
        kycStorage.store();

        res.status(201).send("<h1>Storing kyc on server... Will be updated to the blockchain</h1>");
    }catch(err){
        errHandler(err,next);
    }

};

module.exports = { storeKyc };