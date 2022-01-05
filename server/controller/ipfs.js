const { Ipfs } = require("../lib/ipfs/ipfs");

const storeFile = async(req,res,next) => {

    try{
        console.log("Storing....");

        const IPFS = new Ipfs();

        const fileHashes = await IPFS.getHashesOfFilesInFolder("/home/hrushi/NoWork/Docs");

        console.log(fileHashes);

        await IPFS.createUserKycHash(fileHashes);

        res.status(200).json({"message":"Stored the file successfully"});
    }catch(err){
        if(err)
            return next(err);

        err  = new Error("Internal sever error");
        next(err);
    }

}

module.exports = { storeFile }