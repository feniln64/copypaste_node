const Content = require('../models/model.content');
const Subdomain = require('../models/model.subdomain');
const asyncHandler = require('express-async-handler');
const { json } = require('body-parser');
require('dotenv').config
// import { NetlifyAPI } from 'module';
// const client = new NetlifyAPI(process.env.NETLIFY_TOKEN)


// @desc    Get all subdoamins
// @route   GET /subdoamin
// @access  Private
const getAllSubdomain = asyncHandler(async (req, res) => {
    if (!subdomains?.length) {
        return res.status(404).json({ message: "No subdomains found" });
    }
    res.json(subdomains);
})


// @desc    create subdomains
// @route   POST /subdomains
// @access  Private
const createNewSubdomain = asyncHandler(async (req, res) => {
    const { subdomain } = req.body;
    if (!subdomain) {
        return res.status(400).json({ message: "Please enter all fields" });
    }
    const payload ={
        "type": "CNAME",
        "hostname": subdomain+".devbastion.tk",
        "value": "@",
        "ttl": 3600,
        "priority": 0,
        "weight": 0,
        "port": 0,
        "flag": 0,
        }
    try {
        axiosInstance.post(`dns_zones/${dns_zone_id}/dns_records`, payload, { withCredentials: true })
          .then((response) => {
            res.status(200).json(response.data);
          })
          .catch((error) => {
  
            console.log(error);
            res.status(401).json(error);
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

    // const subdomains = await Subdomain.find().lean();
    // console.log(userId,subdomain,typeof active);
    // check data

    // if (!userId || !subdomain || typeof active !== "boolean" ) {
    //     return res.status(400).json({message: "Please enter all fields"});
    // }
   

    // check if subdomain already exists
    // const duplicate = await Subdomain.findOne({subdomain}).lean().exec();
    // if (duplicate) {
    //     return res.status(409).json({message: "Subdomain already exists"});
    // }

    // const subdomainObject ={ userId, subdomain, active };
    // try {
    //     fetch(`https://api.netlify.com/api/v1/sites/${subdomain}`, {
    //         method: 'POST',
    //         headers: {
    //             "Content-type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             "firstName": "Marcos",
    //             "lastName": "Silva",
    //             "email": "marcos.henrique@toptal.com",
    //             "password": "s3cr3tp4sswo4rd"
    //         })
    //     }).then(function (response) {
    //         return response.json();
    //     })
    //         .then(function (data) {
    //             console.log('Request succeeded with JSON response', data);
    //         })
    //         .catch(function (error) {
    //             console.log('Request failed', error);
    //         });
    // }
    // catch (error) {
    //     console.log(error);
    // }

    // // create subdomain
    //     const createSubdomain = await Subdomain.create(subdomainObject);
    //     if (!createSubdomain) {
    //         res.status(500).json({message: "Something went wrong"});
    //     }else{
    //         res.status(201).json({message: `subdomain ${subdomain} created successfully`});
    //         // res.status(201).json({message: "Subdomain created successfully"});
    //     }
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