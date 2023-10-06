const AWS = require('aws-sdk');
const fs = require('fs');
const QRCode = require('qrcode')
require('dotenv').config();
// create s3 instance using S3Client
// (this is how we create s3 instance in v3)
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY, // store it in .env file to keep it safe
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY

})
var S3_BUCKET = process.env.AWS_BUCKET_NAME;
const upload_to_s3 = (userId, subdomain) => {
    try {
        QRCode.toDataURL(`http://${subdomain}.cpypst.online`, function (err, qrcode) { // qrcode is response base64 encoded data (QR code)
            var buf = Buffer.from(qrcode.replace(/^data:image\/\w+;base64,/, ""), 'base64')
            const image_name = Date.now() + "-" + Math.floor(Math.random() * 1000);
            const params = {
                Bucket: S3_BUCKET,
                Key: `${userId}/${subdomain}/${image_name}.png`, // type is not required
                Body: buf,
                ContentEncoding: 'base64', // required
                ContentType: `image/png` // required. Notice the back ticks
            }
            s3.upload(params, function (err, data) {

                if (err) {
                    console.log('ERROR MSG: ', err);
                } else {
                    console.log('Successfully uploaded data');
                }
            });
        });
    }
    catch (err) {
        console.log(err);
    }

}

module.exports = upload_to_s3;