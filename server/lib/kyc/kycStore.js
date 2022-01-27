const fs = require("fs/promises");
const path = require("path");
const UserSchema = require("../../models/Users");
const { v4: uuidv4 } = require('uuid');
const UnverifiedUsers = require("../../models/UnverifiedUsers");

module.exports = class KycStorage {

    constructor(data,docs){
        this.data = data;
        this.storageId = uuidv4();
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

            const userId = this.data.userId;
            delete this.data.userId;
            // No logic to check if directory exists or not... ======>>>>>> IMPORTANT.... (Server crashing if not added)
            await fs.mkdir(this.path);
            await this.storeUserDetailsAsJson(this.data);
            await this.storeLivePhoto(this.data.livePhoto);
            this.storeDocuments(this.docs);

            await (new UnverifiedUsers({
                userId,
                storageId:this.storageId,
                isScheduledAMeet:false
            })).save();
            
            const userData = await UserSchema.findOneAndUpdate({ userId: userId },{ status:"pending" },{ new:true });

            return { status:userData.status,userId:userData.userId };
        }catch(err){
            throw err;
        }
    }    

    static async deleteFolder(storageId){
        const folderPath = path.join(__dirname,'../..','UserData',storageId);
        await fs.rm(folderPath, { force:true, recursive:true });
    }

}