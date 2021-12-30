const { Ipfs } = require("../lib/ipfs/ipfs");

const storeFile = async(req,res) => {

    console.log("Storing....");

    const IPFS = new Ipfs();

    const fileHashes = await IPFS.getHashesOfFilesInFolder("/home/hrushi/NoWork/Docs");

    console.log(fileHashes);

    await IPFS.createUserKycHash(fileHashes);

    res.status(200).json({"message":"Stored the file successfully"});

}

module.exports = { storeFile }