const nodemailer = require("nodemailer");


const sendMail = async (cipherKey, toEmail) => {

    console.log("Cipher Key ", cipherKey);

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
        Please store the cipherKey safely. Continue payment at http://localhost:3000/profile for uploading your kyc on the blockchain.`,
        html: `
        <div style="background-color: #eee; padding: 24px">
            <div style="border:2px solid #ddd; padding: 24px; font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; letter-spacing: 1px; background-color: snow; width: 550px; border-radius: 8px; margin: auto">
                <h2 style="text-align: center" >  B 'KYC' - CIPHER KEY </h2> <br /><br/>
                <p>Hello !! </p>
                <p>Greetings from Team B'KYC'! </p><br /><br/>
                <p style="text-align: center;">Thankyou for using B'KYC' to fasten up your KYC process.</p> <br/>
                <p>Congratulations !!!  &nbsp;  Your KYC has been verified successfully.<br/><br/> Your documents are securely stored in IPFS and are encrypted using the following cipher-key :   </p> <br />
                <h3 style="text-align: center;"> ${cipherKey} </h3> <br/>
                <p>Please store the cipherKey safely. Use this cipher-key and continue the payment process in the Profie page to upload your documents on the Blockchain.  </p> <br/>
                <p>Any queries ? Hit the reply button :) </p> <br />
                <p>Cheers !! </p>
                <p>Team BKYC </p>
                <hr /> 
                <p style="text-align: center; font-size: 12px;"> &copy; BKYC - 2021. All rights reserved.  </p>
            </div>    
          </div>
        `
    }

     transport.sendMail(mailOptions, (err, _data) => {
        if(err) {
            console.log('Error : ', err);
        } else {
            console.log("Email Sent !");
        }
    })
}


module.exports = { sendMail }