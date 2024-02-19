const asyncHandler = require('express-async-handler');
const Content = require('../models/model.content');
const Subdomain = require('../models/model.subdomain');
const pjson = require('../../package.json');

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
  const contentObject = await Content.findOne({ userId }).lean();
  const content = contentObject.content;
  if (contentObject.is_protected) {
    return res.status(401).json({ message: "Content is Protected Login to your account" });
  }
  if (!content) {
    return res.status(404).json({ message: "No content found" });
  }
  return res.status(200).json({ content: content });
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
      alert(error.response.data.message);
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
  console.log(pjson.version);
  return res.status(200).json({ version: pjson.version });
});

module.exports = {
  initData,
  getDns,
  versionCheck
}