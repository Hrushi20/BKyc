const fs = require("fs/promises");
const path = require("path");
const UnverifiedUsers = require("../../models/UnverifiedUsers");

module.exports = class KycStorage {

    async fetchAllKycs(){
        const kycs = [];
        // const storageIds = await UnverifiedUsers.find({}).exec();
        const storageIds = ["92274f12-5f01-482a-9f87-a715e87b652f"];

        for(let id of storageIds){
            const userData = await this.fetchData(id);
            const userDocs = await this.fetchDocuments(id);
            kycs.push({ ...userData,...userDocs });
        }
        return kycs;
    }

    async fetchDocuments(storageId){

        const docs = {};

        const dirName = path.join(__dirname,"..","..",`UserData/${storageId}`);

        const files = await fs.readdir(dirName);

        const fileNames = files.filter(file => file.startsWith("aadhar.") || file.startsWith("pan."));

        for(let file of fileNames){
            let doc =  (await fs.readFile(`${dirName}/${file}`, { encoding:"base64" })).toString();

            // Need to change type of base64 header for different images...
            doc = "data:image/jpeg;base64," + doc;
            if(file.startsWith("pan"))
                docs["pan"] = doc;
            else if(file.startsWith("aadhar"))
                docs["aadhar"] = doc;
            else
                throw new Error("Error! Shouldn't be able to read such a file");
        }

        return docs;
    }

    async fetchData(storageId){
        const dirName = path.join(__dirname,"..","..",`UserData/${storageId}`);
        const data = await fs.readFile(`${dirName}/userData.json`,'utf8');

        return JSON.parse(data);
    }
}