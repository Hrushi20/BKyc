const twilio = require("twilio");

const accountSid = "AC2afd314ab314d7d87c425a0d42a5da47";
const authToken = "759f0d910924b4709297de30c323fc4f"// Your Auth 

const client = new twilio(accountSid,authToken);

module.exports = class Twilio {
    
    // Your Account SID from www.twilio.com/console
    static async sendMessage(cipherKey,phoneNumber){
        const message = await client.messages
        .create({
            body: `Your kyc has been verified successfully. The cipherKey ${cipherKey} has been used to encrypt your data. 
            Please store the cipherKey safely. Continue payment at http://localhost:3000/profile for uploading your kyc on the blockchain.`,
            to: `+91${phoneNumber}`, // Text this number
            messagingServiceSid: "MG770eb17b7cecf6396947e755aae76572"
        });

    }   
}