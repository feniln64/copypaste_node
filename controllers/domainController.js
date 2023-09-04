const Content = require('../models/model.content');
const Subdomain = require('../models/model.subdomain');
const asyncHandler = require('express-async-handler');
const { json } = require('body-parser');
const { default: axios } = require('axios');
const generateQR = require('../functions/generateQR');
require('dotenv').config
const cf = axios.create({
  baseURL: 'https://api.cloudflare.com/client/v4'
});
cf.defaults.headers.common["x-auth-key"] = "721d500a5a04d543e57d3a2c17e4bbe1036f2";
cf.defaults.headers.common["X-Auth-Email"] = "fenilnakrani39@gmail.com";

const cf_qr = axios.create({
  baseURL: 'https://chart.googleapis.com'
});




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
  // const duplicate = await Subdomain.findOne({ subdomain }).lean().exec();
  // if (duplicate) {
  //   return res.status(409).json({ message: "Subdomain already exists" });
  // }
  // var qr = await generateQR(subdomain,userId);
  const payload ={
    "content": "@",
    "name": subdomain,
    "proxied": true,
    "type": "CNAME",
    "comment": "CNAME for readyle.live react app",
  }
  try {
    cf_qr.get(`/chart?cht=qr&chs=500x500&chl=${subdomain}.realyle.live&choe=UTF-8`)
        .then((response) => {
            console.log(response.data);
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

  // try {
  //   cf.post(`zones/ac2a7392c9f304dea26c229e08f8efc5/dns_records`, payload)
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
  return res.status(201).json({message:"subdomain created successfully"});
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