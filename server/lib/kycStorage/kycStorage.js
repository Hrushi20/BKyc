const fs = require("fs/promises");
const path = require("path");

module.exports = class KycStorage {

    constructor(data,uId,docs){
        this.data = data;
        this.uId = uId;
        this.docs = docs;
        this.path = path.join(__dirname,'../..','UserData',this.uId);
    }

    async storeLivePhoto(livePhoto){
           
            const userPhoto = livePhoto.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(userPhoto,'base64');
            await fs.writeFile(`${this.path}/livePhoto.jpeg`,buffer);

    }

    storeDocuments(docs){
        
        docs.forEach(async(doc) => {
            const fileExtension = doc.mimetype.split('/')[1];
            await fs.writeFile(`${this.path}/${doc.fieldname}.${fileExtension}`,doc.buffer);
        });

    }

    async storeUserDetailsAsJson(data){
        
        await fs.writeFile(`${this.path}/userData.json`,JSON.stringify(data),'utf8');

    }

    async store(){

        this.storeUserDetailsAsJson(this.data);
        this.storeLivePhoto(this.data.livePhoto);
        this.storeDocuments(this.docs);

    }    

}