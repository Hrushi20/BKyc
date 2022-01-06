const { Ipfs } = require("../lib/ipfs/ipfs");
const { errHandler } = require("../utils/errHandler");

const storeFile = async(req,res,next) => {

    try{

        const IPFS = new Ipfs();

        const encryptedUserData = await IPFS.createUserKycHash(data);


        res.status(200).json({"message":"Stored the file successfully"});
    }catch(err){
       errHandler(err,next);
    }

}

module.exports = { storeFile }