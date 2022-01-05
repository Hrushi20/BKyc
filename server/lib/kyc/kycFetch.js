const fs = require("fs/promises");
const path = require("path");
const UnverifiedUsers = require("../../models/UnverifiedUsers");

module.exports = class KycStorage {

    async fetchAllKycs(){
        const kycs = [];
        const storageIds = await UnverifiedUsers.find({}).exec();

        // Todo logic to get all the files from the UserData folder and send it to the client;
        storageIds.forEach(id => {
            
        });
        
        return kycs;
    }

    async fetchDocuments(storageId){

        const docs = {};

        const dirName = path.join(__dirname,"..","..",`UserData/${storageId}`);

        // Need to get mimetype of the file...
        await fs.readFile(`${dirName}/pan.`);
        await fs.readFile(`${dirName}/aadhar.`)

        return docs;
    }

    async fetchData(storageId){
        const dirName = path.join(__dirname,"..","..",`UserData/${storageId}`);
        return await fs.readFile(`${dirName}/userData.json`);
    }
}