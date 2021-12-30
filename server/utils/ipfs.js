const IPFS = require('ipfs-core');

let  node = { ipfs:null }

const initIpfs = async() => {

    if(!node.ipfs)
        node.ipfs = await IPFS.create();
    
    return node.ipfs;
}

module.exports = { initIpfs,node };