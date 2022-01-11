const nodemailer = require("nodemailer");


const sendMail = async (cipherKey, toEmail) => {

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bkycinfo@gmail.com',
            pass: 'Bkycteam@01'
        }
    })

    let mailOptions = {
        from: {
            name: 'Team BKYC',
            address: 'bkycinfo@gmail.com'
        },
        to: toEmail,
        subject: `CipherKey of your IPFS Hash`,
        text: `Your kyc has been verified successfully. The cipherKey ${cipherKey} has been used to encrypt your data. 
        Please store the cipherKey safely. Continue payment at http://localhost:3000/profile for uploading your kyc on the blockchain.`
    }

    await transport.sendMail(mailOptions, (err, data) => {
        if(err) {
            console.log('Error : ', err);
        } else {
            console.log("Email Sent !");
        }
    })
}

module.exports = { sendMail }