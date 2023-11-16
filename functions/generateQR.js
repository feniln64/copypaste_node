const AWS = require('aws-sdk');
const QRCode = require('qrcode');
require('dotenv').config();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY, // store it in .env file to keep it safe
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

var S3_BUCKET = process.env.AWS_BUCKET_NAME;

var opts = {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    quality: 0.3,
    margin: 1,
    version: 9,
    color: {
      dark: "#000000",
      light: "#ffffff"
    }
  }

exports.upload_to_s3 = async (subdomain) => {
    try {
        QRCode.toDataURL(`http://${subdomain}.cpypst.online`,opts, function (err, qrcode) { // qrcode is response base64 encoded data (QR code)
            var buf = Buffer.from(qrcode.replace(/^data:image\/\w+;base64,/, ""), 'base64')
            const image_name = Date.now() + "-" + Math.floor(Math.random() * 1000);
            const params = {
                Bucket: S3_BUCKET,
                Key: `${subdomain}/${image_name}.png`, // type is not required
                Body: buf,
                ContentEncoding: 'base64', // required
                ContentType: `image/png` // required. Notice the back ticks
            };
            s3.upload(params, function (err) {
                if (err) {
                    console.log('ERROR MSG: ', err);
                    return false;
                }
                else {
                    console.log('Successfully uploaded data');
                    return true;
                }
            });
        });
    }
    catch (err) {
        console.log(err);
        return false;
    }

}
