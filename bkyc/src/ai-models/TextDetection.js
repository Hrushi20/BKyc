const vision = require('@google-cloud/vision');
const details = require('./BKYC_GoogleServiceAccount.json');

const CREDENTIALS = JSON.parse(JSON.stringify(details));

const CONFIG = {
    credentials: {
        private_key: CREDENTIALS.private_key,
        client_email: CREDENTIALS.client_email
    }
};

const client = new vision.ImageAnnotatorClient(CONFIG);

const detectText = async (file_path) => {
    let [res] = await client.textDetection(file_path);
    console.log(res.fullTextAnnotation.text);
}

detectText('1.png');


module.exports = { detectText }