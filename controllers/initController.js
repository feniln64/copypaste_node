
const asyncHandler = require('express-async-handler');
const { json } = require('body-parser');

// @desc    Get all data
// @route   GET /init
// @access  Public
const initData = asyncHandler(async (req, res) => {

    const domain = req.headers.host.split('.')[0];
    if (!domain) {
        res.status(400)
        throw new Error('Please provide domain');
    } else {
        res.status(200).json({
            domain
        })
    }
})
// @desc    Get all data
// @route   GET /init/dns
// @access  Public
const getDns = asyncHandler(async (req, res) => {
    const {subdomain} = req.body;
    const payload ={
        "type": "string",
        "hostname": "string",
        "value": "string",
        "ttl": 0,
        "priority": 0,
        "weight": 0,
        "port": 0,
        "flag": 0,
        "tag": "string"
        }
    try {
        axiosInstance.post(`dns_zones/dns_zone_id/dns_records`, {}, { withCredentials: true })
          .then((response) => {
            console.log("init.response =", response);
            res.status(200).json(response.data);
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
})



module.exports = {
    initData,
    getDns
}