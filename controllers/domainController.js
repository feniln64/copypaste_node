const { default: axios } = require('axios');
const Subdomain = require('../models/model.subdomain');
const User = require('../models/model.user');
const asyncHandler = require('express-async-handler');
const uploader = require('../functions/generateQR');
require('body-parser');
require('dotenv').config();
const { cf, minioClient } = require('../config/imports');
const logger = require('../config/wtLogger');

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

  const { subdomain } = req.body;
  const userId = req.params.userId;
console.log(userId,subdomain)
  if (!userId || !subdomain) {
    return res.status(400).json({ message: "userId, subdomain  are required to create subdomain" });
  }
  const count = await Subdomain.countDocuments({ userId }).exec();
  const user = await User.findOne({ _id: userId}).lean().exec();
  if (count >= 2 && !user.premium_user) {
    return res.status(409).json({ message: "User already has 2 subdomain buy premium for more subdomain" });
  }
  else if (count >= 5 && user.premium_user) {
    return res.status(409).json({ message: "User already has 5 subdomain" });
  }

  const duplicate_subdomain = await Subdomain.findOne({ subdomain }).lean().exec();
  if (duplicate_subdomain) {
    return res.status(409).json({ message: "subdomain is already taken" });
  }

  const payload = { "content": "@", "name": subdomain, "proxied": true, "type": "CNAME", "comment": "CNAME for cpypst.online react app" }

  // creating subdomain in cloudflare
  let dns_record_id = ""

  await cf.post(`zones/${process.env.CLOUDFLARE_ZONE_ID}/dns_records`, payload)
    .then((response) => {
      dns_record_id = response.data.result.id
      logger.info("subdoamin created successfully in cloudflare")
    })
    .catch((error) => {
      logger.error(error)
      return res.status(409).json({ message: "error in function" });
    });

  await uploader(subdomain).then((res) => {
    logger.info(res)
  }).catch((err) => {
    logger.error(err)
    return res.status(409).json({ message: "error in upload QR " });
  })

  const subdomainObject = { userId, subdomain, active: true, dns_record_id };
  const createSubdomain = Subdomain.create(subdomainObject);

  if (!createSubdomain) {
    return res.status(500).json({ message: "subdoamin not created" });
  }

  return res.status(201).json(
    {
      message: `subdomain ${subdomain} created successfully`,
      subdomainObject: subdomainObject
    });
});

const checkSubdomainAvailability = asyncHandler(async (req, res) => {
  
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ message: "userId  is required " });
  }
  const count = await Subdomain.countDocuments({ userId }).exec();
  const user = await User.findOne({ _id: userId}).lean().exec();
  if (count >= 2 && !user.premium_user) {
    return res.status(409).json({ message: "User already has 2 subdomain buy premium for more subdomain" });
  }
  else if (count >= 5 && user.premium_user) {
    return res.status(409).json({ message: "User already has 5 subdomain" });
  }
  return res.status(200).json({ message: "subdomain available for creation" });
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
    cf.patch(`zones/${process.env.CLOUDFLARE_ZONE_ID}/dns_records/${subdomain_id}`, payload)
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

  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).json({ message: "userId is required in usr params" });
  }
  const subdomains = await Subdomain.find({ userId }).lean();

  if (subdomains.length === 0) {
    return res.status(204).json({ message: "No subdomains found" });
  }
  return res.status(200).json(subdomains);
});

const deleteSubdomainByUserId = asyncHandler(async (req, res) => {

  const userId = req.params;
  const subdomains = await Subdomain.find(userId).lean().exec();

  if (!subdomains?.length) {
    return res.status(404).json({ message: "No subdomains found" });
  }
  return res.json(subdomains);
});

const deleteSubdomainbySubdoamin = asyncHandler(async (req, res) => {

  const subdomain = req.params.subdomain;
  if (!subdomain) {
    return res.status(400).json({ message: "subdomain is required in usr params" });
  }
  console.log(subdomain)

  const subdomainObject = await Subdomain.findOne({ subdomain }).lean().exec();
  console.log(subdomainObject)
  if (!subdomainObject) {
    return res.status(404).json({ message: "subdomain not found in database" });
  }

  await cf.delete(`zones/${process.env.CLOUDFLARE_ZONE_ID}/dns_records/${subdomainObject.dns_record_id}`)
    .then((response) => {

      logger.info("subdoamin deleted successfully from cloudflare")
    })
    .catch((error) => {
      logger.error(error)
      return res.status(409).json({ message: "error deleting subdoamin from cloudflare" });
    });

  await minioClient.removeObject('docopypaste', `qr/${subdomain}/${subdomain}.png`)
    .then(() => {
      logger.info("qr deleted successfully")
    })
    .catch((error) => {
      logger.error(error)
      return res.status(409).json({ message: "error while delete qr code from minio" });
    });

  const deleteSubdoamin = await Subdomain.deleteOne({ subdomain });
  if (!deleteSubdoamin) {
    return res.status(409).json({ message: "subdomain not deleted" });
  }

  return res.json({ "message": "subdomain deleted" });
});

module.exports = {
  getAllSubdomain,
  createNewSubdomain,
  updateDomain,
  getSubdomainByUserId,
  deleteSubdomainByUserId,
  deleteSubdomainbySubdoamin,
  checkSubdomainAvailability
}