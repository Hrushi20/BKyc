const fs = require("fs/promises");
const path = require("path");
const UserSchema = require("../../models/Users");

module.exports = class KycStorage {

    async fetchAllKycs(){
        const kycs = [];

        // Better to create unverified kyc model to solve future bugs....
        const users = await UserSchema.find({}).exec();

        for(let user of users){
            const userData = await this.fetchData(user.storageId);
            const userDocs = await this.fetchDocuments(user.storageId);
            kycs.push({ ...userData,...userDocs,userId: user.userId});
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