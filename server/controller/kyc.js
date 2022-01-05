const fs = require("fs/promises");
const { v4: uuidv4 } = require('uuid');

const storeKyc = (req,res,next) => {

    try{
        // Get the json data from client
        const data = JSON.parse(req.body.body);

        // Get the pan and aadhar details
        const files = req.files;

        const uId = uuidv4();

        res.status(201).send("<h1>Storing kyc on server... Will be updated to the blockchain</h1>");
    }catch(err){
        if(err)
            return next(err);

        err  = new Error("Internal sever error");
        next(err);
    }

};

module.exports = { storeKyc };