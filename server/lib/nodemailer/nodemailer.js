const nodemailer = require("nodemailer");


const sendMail = async (toEmail) => {

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bkycinfo@gmail.com',
            pass: 'Bkycteam@01'
        }
    })

    let mailOptions = {
        from: 'bkycinfo@gmail.com',
        to: toEmail,
        subject: 'Test email',
        text: 'Test message'
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