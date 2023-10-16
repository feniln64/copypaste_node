const { default: axios } = require('axios');
const Subdomain = require('../models/model.subdomain');
const asyncHandler = require('express-async-handler');
var QRCode = require('qrcode')
const AWS = require("aws-sdk");
require('body-parser');
require('dotenv').config();

// create s3 instance using S3Client 
// (this is how we create s3 instance in v3)
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY, // store it in .env file to keep it safe
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
var S3_BUCKET = process.env.AWS_BUCKET_NAME;

const cf = axios.create({
  baseURL: 'https://api.cloudflare.com/client/v4'
});
cf.defaults.headers.common["x-auth-key"] = "721d500a5a04d543e57d3a2c17e4bbe1036f2";
cf.defaults.headers.common["X-Auth-Email"] = "fenilnakrani39@gmail.com";

// @desc    Get all subdoamins
// @route   GET /subdoamin/getall
// @access  Private
const getAllSubdomain = asyncHandler(async (req, res) => {

  const subdomains = await Subdomain.find({}).lean().exec();

  if (!subdomains?.length) {
    return res.status(404).json({ message: "No subdomains found" });
  }
  res.json(subdomains);
});

// @desc    create subdomains
// @route   POST /subdomain/create
// @access  Private
const createNewSubdomain = asyncHandler(async (req, res) => {

  const { subdomain, active } = req.body;
  const userId = req.params.userId;

  if (!userId || !subdomain || typeof active !== "boolean") {
    if (!active) {
      return res.status(400).json({ message: "user is not active" });
    }
    return res.status(400).json({ message: "userId, subdomain and active type are required to create subdomain" });
  }

  const payload = {
    "content": "@",
    "name": subdomain,
    "proxied": true,
    "type": "CNAME",
    "comment": "CNAME for ready.live react app",
  }

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

  QRCode.toDataURL(`http://${subdomain}.cpypst.online`, opts, function () { // Qr-code is response base64 encoded data (QR code)
    const image_name = Date.now() + "-" + Math.floor(Math.random() * 1000);
    const params = {
      Bucket: S3_BUCKET,
      Key: `${subdomain}/${image_name}.png`, // type is not required
      Body: buf,
      ContentEncoding: 'base64', // required
      ContentType: `image/png` // required. Notice the back ticks
    }
    s3.upload(params, function (err) {
      if (err) {
        console.log('ERROR MSG: ', err);
      } else {
        console.log('Successfully uploaded data');
      }
    });
  });

  // creating subdomain in cloudflare
  try {
    cf.post(`zones/${process.env.CLOUDFLARE_ZONE_ID}/dns_records`, payload)
      .then((response) => {
        const dns_record_id = response.data.result.id
        const subdomainObject = { userId, subdomain, active, dns_record_id };
        const createSubdomain = Subdomain.create(subdomainObject);

        if (!createSubdomain) {
          return res.status(500).json({ message: "Something went wrong" });
        }

        return res.status(201).json(
          {
            message: `subdomain ${subdomain} created successfully`,
            subdomainObject: subdomainObject
          });
      })
      .catch((error) => {
        return res.status(409).json({ message: "error in function" });
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

// @desc    update subdomain
// @route   POST /subdoamin
// @access  Private || private means require token
const updateDomain = asyncHandler(async (req, res) => {

  const { newDomain, premium_user } = req.body;
  const userId = req.params.userId;

  if (!newDomain || typeof premium_user !== "boolean") {
    return res.status(400).json({ message: "User Id and New domain and premium user required.." });
  }

  if (premium_user !== true) {
    return res.status(400).json({ message: "only premium user can update domain" });
  }

  const newSubDomain = await Subdomain.findOne({ userId }).exec();

  if (!newSubDomain) {
    return res.status(404).json({ message: "User not found" });
  }

  const duplicate = await Subdomain.findOne({ subdomain: newDomain }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "This domain is already exists with another user" });
  }

  const subdomain_id = newSubDomain.dns_record_id;

  const payload = {
    "content": "@",
    "name": newDomain,
    "proxied": true,
    "type": "CNAME",
    "comment": "CNAME for readyle.live react app",
  }
  try {
    cf.patch(`zones/ac2a7392c9f304dea26c229e08f8efc5/dns_records/${subdomain_id}`, payload)
      .then(() => {
        newSubDomain.subdomain = newDomain;
        const updateSubDomain = newSubDomain.save();
        if (!updateSubDomain) {
          return res.status(500).json({ message: "Something went wrong during updating subdomain" });
        }

        return res.status(201).json(
          {
            message: `subdomain ${newDomain} updated successfully`,
            subdomainObject: newSubDomain
          });
      })
      .catch((error) => {
        return res.status(409).json({ message: "error in function" });

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

const getSubdomainByUserId = asyncHandler(async (req, res) => {

  const userId = req.params;
  const subdomains = await Subdomain.find(userId).lean().exec();

  if (subdomains.length === 0) {
    return res.status(204).json({ message: "No subdomains found" });
  }
  return res.json(subdomains);
});

const deleteSubdomainByUserId = asyncHandler(async (req, res) => {

  const userId = req.params;
  const subdomains = await Subdomain.find(userId).lean().exec();

  if (!subdomains?.length) {
    return res.status(404).json({ message: "No subdomains found" });
  }
  return res.json(subdomains);
});

module.exports = {
  getAllSubdomain,
  createNewSubdomain,
  updateDomain,
  getSubdomainByUserId,
  deleteSubdomainByUserId
}