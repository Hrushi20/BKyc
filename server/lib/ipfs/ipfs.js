const { node } = require("../../utils/initEssentials");
const { globSource } = require('ipfs-core');

class Ipfs {

    async getHashesOfFilesInFolder (dir_name){
        const fileHashes = [];

        for await(let hashes of node.ipfs.addAll(globSource(dir_name,"**/*")))
            fileHashes.push(hashes);
        
        return fileHashes;
    }

    /*
        Creates an html file and returns the hash of the html file. 
    */
    async createUserKycHash(data){

        const html = 
        `<html>
            <head>
                <title>Hrushi</title>
            </head>
            <body>
                <table>
                    <tr>
                        <td>Name</td>
                        <td>Hrushi</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>fjdksafjlaksdfjksdf</td>
                    </tr>
                </table>

                <img src="https://ipfs.io/ipfs/QmfGcymAVSEPJx8W7PgNhPaxruY4d15mbW9caNanpj3WqD" alt="Pan card"/>
                <img src="https://ipfs.io/ipfs/QmYz9doeU4fcihEFn6exDqHyhJsY8Yi1EwwmmHjXDqWcUY" alt="Aadhar card">
            </body>
        </html>`

        const htmlHash = await node.ipfs.add(html);

        return htmlHash;
    }

}

module.exports = { Ipfs }