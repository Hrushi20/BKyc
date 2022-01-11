const ipfsClient = require("ipfs-http-client");
const { connect } = require("mongoose");

let  node = { ipfs:null,mongoose:null }

const initEssentials = async() => {

    if(!node.ipfs)
        node.ipfs = ipfsClient.create({ host:"localhost",port:5001,protocol:'http' });

    if(!node.mongoose)
        node.mongoose = await connect(process.env.MONGODB_URL);

    return node;
}

module.exports = { initEssentials,node };