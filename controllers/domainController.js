const Content = require('../models/model.content');
const Subdomain = require('../models/model.subdomain');
const asyncHandler = require('express-async-handler');
const { json } = require('body-parser');
const { default: axios } = require('axios');
require('dotenv').config
const cf = axios.create({
  baseURL: 'https://api.cloudflare.com/client/v4'
},
);
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
  const { subdomain ,userId,active} = req.body;
  if (!userId || !subdomain || typeof active !== "boolean" ) {
      if(!active)
      {
        return res.status(400).json({ message: "user is not active" });
      }
      return res.status(400).json({message: "Please enter all fields"});
  }
 
  // check if subdomain already exists
  const duplicate = await Subdomain.findOne({ subdomain }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Subdomain already exists" });
  }

  const payload ={
    "content": "@",
    "name": subdomain,
    "proxied": false,
    "type": "CNAME",
    "comment": "CNAME for readyle.live react app",
  }
  try {
    cf.post(`zones/ac2a7392c9f304dea26c229e08f8efc5/dns_records`, payload)
      .then((response) => {
        const dns_record_id=response.data.result.id
        console.log("record id "+dns_record_id);
        const subdomainObject = { userId, subdomain, active, dns_record_id };
        const createSubdomain =  Subdomain.create(subdomainObject);
        if (!createSubdomain) {
          return res.status(500).json({ message: "Something went wrong" });
        }

        return res.status(201).json(
          {
            message: `subdomain ${subdomain} created successfully`,
            subdomainObject: subdomainObject
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

})

// @desc    update subdomain
// @route   POST /subdoamin
// @access  Private || private means require token
const updateDomain = asyncHandler(async (req, res) => {
  const { userId, newDomain } = req.body;
  // console.log(email,name,roles,active,premium_user);
  console.log(req.body.id);
  if (!userId || !newDomain) {
    return res.status(400).json({ message: "Userid and New domain required.." });
  }

  const newSubDomain = await Subdomain.findOne({ userId: userId }).exec();
  if (!newSubDomain) {
    return res.status(404).json({ message: "User not found" });
  }

  const duplicate = await Subdomain.findOne({ subdomain: newDomain }).lean().exec();
  console.log("duplicate is =" + duplicate.subdomain);
  // if (duplicate && duplicate.email.toString() === email) {
  //     return res.status(409).json({message: "This email is already exists with another account"});
  // }

  if (duplicate) {
    return res.status(409).json({ message: "This domain is already exists with another user" });
  }

  const updateSubDomain = await newSubDomain.save();
  if (!updateSubDomain) {
    res.status(500).json({ message: "Something went wrong" });
  } else {
    res.status(200).json({ message: `${name} updated successfully}` });
  }

})

module.exports = {
  getAllSubdomain,
  createNewSubdomain,
  updateDomain
}