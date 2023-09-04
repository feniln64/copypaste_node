const { default: axios } = require('axios');
const Qr = require('../models/model.qr');

const cf = axios.create({
    baseURL: 'https://chart.googleapis.com'
});

const generateQR = (subdomain,userId) => {
    console.log("generateQR called");
    try {
        cf.get(`/chart?cht=qr&chs=500x500&chl=${subdomain}.realyle.live&choe=UTF-8`)
            .then((response) => {
                console.log(response.data);
                return response.data;
                // Qr.create({userId,qr_code:response.config.url})
            })
            .catch((error) => {
                console.log(error);
            });
    }
    catch (error) {
        if (error.response) {
            console.log(error.response);
            alert(error.response.data.message);
        } else if (error.request) {
            console.log("network error");
        } else {
            console.log(error);
        }
    }

}

module.exports = generateQR;