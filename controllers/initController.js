
const asyncHandler = require('express-async-handler');
const { json } = require('body-parser');
const Content = require('../models/model.content');
const Subdomain = require('../models/model.subdomain');
// @desc    Get all data
// @route   GET /init/:subdomain
// @access  Public
const initData = asyncHandler(async (req, res) => {
    
    const sub=req.body.subdomain;
    // const domain = req.headers.host.split('.')[0];
    console.log("subdomain =", sub);

    // const userId = req.params.userId; //doimain.com/users/email(value of email)

    const already_exist = await Subdomain.findOne({ subdomain:sub }).lean();
    // console.log("already_exist =", already_exist);
    const userId=already_exist.userId;
    console.log("userId =", userId.toString());
    const contentObject = await Content.findOne({ userId }).lean();
    const content=contentObject.content;  
    if (!already_exist) {
        return res.status(404).json({ message: "No content found" });
    }
    return res.status(200).json({constent:content});
    
    
    // if (!sub) {
    //     res.status(400)
    //     throw new Error('Please provide domain');
    // } else {
    //     res.status(200).json({
    //       sub
    //     })
    // }
})

  // const content = req.params.content;
  // const content = await Content.find().lean();
  // if (!content?.length) {
  //     return res.status(404).json({ message: "No content found" });
  // }
  // res.json(content);


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