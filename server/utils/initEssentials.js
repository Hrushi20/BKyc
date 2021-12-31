const IPFS = require('ipfs-core');
const { connect } = require("mongoose");

let  node = { ipfs:null,mongoose:null }

const initEssentials = async() => {

    if(!node.ipfs)
        node.ipfs = await IPFS.create();

    if(!node.mongoose)
        node.mongoose = await connect(process.env.MONGODB_URL);

    return node;
}

module.exports = { initEssentials,node };