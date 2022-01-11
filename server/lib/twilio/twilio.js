const twilio = require("twilio");



module.exports = class Twilio {
    
    static accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
    static authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth 
    static client = new twilio(accountSid, authToken);

    static async sendMessage(cipherKey,phoneNumber){
        const message = await client.messages
        .create({
            body: `Your kyc has been verified successfully. The cipherKey ${cipherKey} has been used to encrypt your data. 
            Please store the cipherKey safely. Continue payment at http://localhost:3000/profile for uploading your kyc on the blockchain.`,
            to: phoneNumber, // Text this number
            messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID
        });

        console.log(message.sid);
    }   
}