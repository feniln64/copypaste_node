const { default: axios } = require('axios');
const Subdomain = require('../models/model.subdomain');
require('dotenv').config();


const cf = axios.create({
    baseURL: 'https://api.cloudflare.com/client/v4'
  });
  cf.defaults.headers.common["x-auth-key"] = "721d500a5a04d543e57d3a2c17e4bbe1036f2";
  cf.defaults.headers.common["X-Auth-Email"] = "fenilnakrani39@gmail.com";
  
exports.domainGenerator2 = async (subdomain) => {
    const payload = {
        "content": "@",
        "name": subdomain,
        "proxied": true,
        "type": "CNAME",
        "comment": "CNAME for ready.live react app",
      }
try {
    cf.post(`zones/${process.env.CLOUDFLARE_ZONE_ID}/dns_records`, payload)
      .then((response) => {
        const dns_record_id = response.data.result.id
        if (!createSubdomain) {
          console.log("error in creating subdomain");
        }
        console.log("subdomain created");
        return dns_record_id;
      })
      .catch((error) => {
        console.log(error.data);
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

}