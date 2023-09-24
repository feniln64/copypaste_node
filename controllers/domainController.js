const Content = require('../models/model.content');
const Subdomain = require('../models/model.subdomain');
const asyncHandler = require('express-async-handler');
const { json } = require('body-parser');
const { default: axios } = require('axios');
var QRCode = require('qrcode')
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
require('dotenv').config();
// create s3 instance using S3Client 
// (this is how we create s3 instance in v3)
const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY, // store it in .env file to keep it safe
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    region: "us-east-1" // this is the region that you select in AWS account
})



var fs = require('fs');

const generateQR = require('../functions/generateQR');
require('dotenv').config
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
})


// @desc    create subdomains
// @route   POST /subdomain/create
// @access  Private
const createNewSubdomain = asyncHandler(async (req, res) => {
  const { subdomain,active} = req.body;
  const userId = req.params.userId;
  console.log("create NewSubdomain called");
  console.log("subdomain =", subdomain);
  console.log("userId =", userId);
  console.log("active =", active);
  if (!userId || !subdomain || typeof active !== "boolean" ) {
      if(!active)
      {
        return res.status(400).json({ message: "user is not active" });
      }
      return res.status(400).json({message: "userId, subdomain and active type are required to create subdomain"});
  }
 
  // check if subdomain already exists
  const duplicate = await Subdomain.findOne({ subdomain }).lean().exec();
  // if (duplicate) {
  //   return res.status(409).json({ message: "Subdomain already exists" });
  // }
  const payload ={
    "content": "@",
    "name": subdomain,
    "proxied": true,
    "type": "CNAME",
    "comment": "CNAME for readyle.live react app",
  }
  var opts = {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    quality: 0.3,
    margin: 1,
    version: 9,
    color: {
      dark:"#000000",
      light:"#ffffff"
    }
  }
  // save qr code in local and upload to s3

  QRCode.toFile('./QRS/file.png', `http://${subdomain}.cpypst.online`, opts, function(err) {
    if (err) throw err;
    console.log('QR code saved!');
    const s3Storage = multerS3({
      s3: s3, // s3 instance
      bucket: process.env.AWS_BUCKET_NAME, // change it as per your project requirement
      acl: "public-read", // storage access type
      metadata: (req, file, cb) => {
          cb(null, {fieldname: file.fieldname})
      },
      key: (req, file, cb) => {
          const fileName = Date.now() + "_" + file.fieldname + "_" + file.originalname;
          cb(null, fileName);
      }
  });
 

    
  return res.status(201).json({ message: "subdomain created successfully" });

  });

  // creating subdomain in cloudflare
  // try {
  //   cf.post(`zones/${process.env.CLOUDFLARE_ZONE_ID}/dns_records`, payload)
  //     .then((response) => {
  //       const dns_record_id=response.data.result.id
  //       console.log("record id "+dns_record_id);
  //       const subdomainObject = { userId, subdomain, active, dns_record_id };
  //       const createSubdomain =  Subdomain.create(subdomainObject);
  //       if (!createSubdomain) {
  //         return res.status(500).json({ message: "Something went wrong" });
  //       }

  //       return res.status(201).json(
  //         {
  //           message: `subdomain ${subdomain} created successfully`,
  //           subdomainObject: subdomainObject
  //         });
  //       // return record_id
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       return res.status(409).json({ message: "error in function" });
        
  //     });
  // }
  // catch (error) {
  //   if (error.response) {
  //     console.log(error.response);
  //     alert(error.response.data.message);
  //   } else if (error.request) {
  //     console.log("network error");
  //   } else {
  //     console.log(error);
  //   }
  // }
 
})

// @desc    update subdomain
// @route   POST /subdoamin
// @access  Private || private means require token
const updateDomain = asyncHandler(async (req, res) => {
  const { newDomain, premium_user } = req.body;
  // console.log(email,name,roles,active,premium_user);
  const userId = req.params.userId;
  console.log("updateDomain called");
  if ( !newDomain || typeof premium_user !== "boolean") {
    return res.status(400).json({ message: "Userid and New domain and premium user required.." });
  }

  if (premium_user !== true) {
    return res.status(400).json({ message: "only premium user can update domain" });
  }

  const newSubDomain = await Subdomain.findOne({ userId }).exec();
  console.log("newSubDomain =", newSubDomain);
  if (!newSubDomain) {
    return res.status(404).json({ message: "User not found" });
  }

  const duplicate = await Subdomain.findOne({ subdomain: newDomain }).lean().exec();
  console.log("duplicate is =" + duplicate);
  // if (duplicate && duplicate.email.toString() === email) {
    //     return res.status(409).json({message: "This email is already exists with another account"});
    // }
    
    if (duplicate) {
      return res.status(409).json({ message: "This domain is already exists with another user" });
    }
    
    const subdomain_id=newSubDomain.dns_record_id;
    console.log("subdomain_id =", subdomain_id);
   
    const payload ={
      "content": "@",
      "name": newDomain,
      "proxied": true,
      "type": "CNAME",
      "comment": "CNAME for readyle.live react app",
    }
    try {
    cf.patch(`zones/ac2a7392c9f304dea26c229e08f8efc5/dns_records/${subdomain_id}`, payload)
      .then((response) => {

        newSubDomain.subdomain = newDomain;
        const updateSubDomain =  newSubDomain.save();
        if (!updateSubDomain) {
          return res.status(500).json({ message: "Something went wrong during updating subdoamin" });
        }

        return res.status(201).json(
          {
            message: `subdomain ${newDomain} updated successfully`,
            subdomainObject: newSubDomain
          });
        // return record_id
      })
      .catch((error) => {
        console.log(error);
        return res.status(409).json({ message: "error in function" });
        
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
  // newSubDomain.subdomain = newDomain;
  // const updateSubDomain = await newSubDomain.save();
  // if (!updateSubDomain) {
  //   res.status(500).json({ message: "Something went wrong" });
  // } else {
  //   res.status(200).json({ message: ` updated successfully` });
  // }

})

const getSubdomainByUserId = asyncHandler(async (req, res) => {
  const  userId  = req.params;
  console.log("getSubdomainByUserId called");
  const subdomains = await Subdomain.find(userId).lean().exec();
  console.log("subdomains =",subdomains);
  if (subdomains.length===0) {
    return res.status(204).json({ message: "No subdomains found" });
  }
  return res.json(subdomains);
})

const deleteSubdomainByUserId = asyncHandler(async (req, res) => {
  const  userId  = req.params;
  console.log("getSubdomainByUserId called");
  const subdomains = await Subdomain.find(userId).lean().exec();
  console.log("subdomains =",subdomains);
  if (!subdomains?.length) {
    return res.status(404).json({ message: "No subdomains found" });
  }
  return res.json(subdomains);
})

module.exports = {
  getAllSubdomain,
  createNewSubdomain,
  updateDomain,
  getSubdomainByUserId,
  deleteSubdomainByUserId
}