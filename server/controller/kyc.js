const fs = require("fs/promises");
const { v4: uuidv4 } = require('uuid');

const storeKyc = (req,res) => {

    // Get the json data from client
    const data = JSON.parse(req.body.body);

    // Get the pan and aadhar details
    const files = req.files;

    const uId = uuidv4();



    res.status(201).send("<h1>Storing kyc on server... Will be updated to the blockchain</h1>");

};

module.exports = { storeKyc };