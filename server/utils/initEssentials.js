const ipfsClient = require("ipfs-http-client");
const { connect } = require("mongoose");

let  node = { ipfs:null,mongoose:null }

const initEssentials = async() => {

    if(!node.ipfs)
        node.ipfs = ipfsClient.create({ host:process.env.IPFS_URL || 'localhost',port:5001,protocol:'http' });

    if(!node.mongoose){
        let url = process.env.MONGODB_URL;
        if(process.env.MONGODB_URL_DOCKER){
            url = `mongodb://admin:admin@${process.env.MONGODB_URL_DOCKER}:27017`;
        }
        node.mongoose = await connect(url);
    }

    return node;
}

module.exports = { initEssentials,node };
