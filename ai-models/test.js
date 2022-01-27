var gcloud = require('gcloud')({
    keyFilename: 'ai-models/BKYC_GoogleServiceAccount.json',
    projectId: 'bkyc-0000'
  });
  var vision = gcloud.vision();
  
  var image = 'ai-models/images/1.png';
  
  vision.detectText(image, function(err, text, apiResponse) {
    // text = ['This was text found in the image']
  });