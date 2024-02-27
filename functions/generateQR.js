const AWS = require('aws-sdk');
const QRCode = require('qrcode');
const logger = require('../config/wtLogger');
require('dotenv').config();
const minioClient = require('../config/imports').minioClient;

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

const uploader = async (username) => {
    logger.info('Generating QR code for subdomain', username)
    try {
        QRCode.toDataURL(`http://${username}.cpypst.online`, opts, async function (err, qrcode) { // qrcode is response base64 encoded data (QR code)
            var buf = Buffer.from(qrcode.replace(/^data:image\/\w+;base64,/, ""), 'base64')
            await minioClient.putObject('docopypaste', `qr/${username}/${username}.png`, buf, function (err, objInfo) {
                if (err) {
                    logger.error('Error', err)
                    return err // err should be null
                }
                logger.info('uploaded QR', objInfo)
            });

        });
    }
    catch (err) {
        logger.error('Error', err)
        return err;
    }
}

module.exports = uploader;
