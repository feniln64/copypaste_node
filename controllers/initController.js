const asyncHandler = require('express-async-handler');
const Content = require('../models/model.content');
const Subdomain = require('../models/model.subdomain');
const User = require('../models/model.user');
const pjson = require('../package.json');

// @desc    Get all data
// @route   GET /init/:subdomain
// @access  Public
const initData = asyncHandler(async (req, res) => {
  console.log("init route hit");
  const sub = req.params.subdomain;
  const already_exist = await Subdomain.findOne({ subdomain: sub }).lean();

  if (!already_exist) {
    return res.status(404).json({ message: "No subdomain found" });
  }

  const userId = already_exist.userId;
  const userObject = await User.findOne({ _id: userId}).lean();
  const username = userObject.username;
  const contentObject = await Content.find({ userId, is_protected:false }).lean();
  if (!contentObject) {
    return res.status(404).json({ message: "No content found" });
  }

  return res.status(200).json({ "content": contentObject,"userInfo":{"userId":userId,"username":username} });
});

// @desc    Get all data
// @route   GET /init/dns
// @access  Public
const getDns = asyncHandler(async (req, res) => {
  try {
    axiosInstance.post(`dns_zones/dns_zone_id/dns_records`, {}, { withCredentials: true })
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  catch (error) {
    if (error.response) {
      console.log(error.response.data.message);
    }
    else if (error.request) {
      console.log("network error");
    }
    else {
      console.log(error);
    }
  }
});


const versionCheck = asyncHandler(async (req, res) => {
  return res.status(200).json({ version: pjson.version,description: pjson.description});
});

module.exports = {
  initData,
  getDns,
  versionCheck
}