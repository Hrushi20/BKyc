const fs = require("fs/promises");
const path = require("path");
const UnverifiedUsers = require("../../models/UnverifiedUsers");

module.exports = class KycStorage {

    constructor(data,storageId,docs){
        this.data = data;
        this.storageId = storageId;
        this.docs = docs;
        this.path = path.join(__dirname,'../..','UserData',this.storageId);
    }

    // Converting image from base64 and storing it...
    async storeLivePhoto(livePhoto){
           
            const userPhoto = livePhoto.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(userPhoto,'base64');
            await fs.writeFile(`${this.path}/livePhoto.jpeg`,buffer);

    }

    // Storing all the kyc docs(aadhar and pan)...
    storeDocuments(docs){
        
        docs.forEach(async(doc) => {
            const fileExtension = doc.mimetype.split('/')[1];
            await fs.writeFile(`${this.path}/${doc.fieldname}.${fileExtension}`,doc.buffer);
        });

    }

    // Storing the userKyc json file...
    async storeUserDetailsAsJson(data){
        
        await fs.writeFile(`${this.path}/userData.json`,JSON.stringify(data),'utf8');

    }

    async store(){

        try{
            // No logic to check if directory exists or not... ======>>>>>> IMPORTANT.... (Server crashing if not added)
            await fs.mkdir(this.path);
            await this.storeUserDetailsAsJson(this.data);
            await this.storeLivePhoto(this.data.livePhoto);
            this.storeDocuments(this.docs);

            // Storing data in database...
            // const unverifiedUsers = new UnverifiedUsers({
            //     userId:"kfjdsalfjdska93240234",
            //     storageId:this.storageId
            // })

            // await unverifiedUsers.save();
        }catch(err){
            throw err;
        }
    }    

}