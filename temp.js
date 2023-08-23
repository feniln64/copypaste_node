const { default: axios } = require('axios');
require('dotenv').config
const cf = axios.create({
  baseURL: 'https://api.cloudflare.com/client/v4'
},
);
cf.defaults.headers.common["x-auth-key"] = "721d500a5a04d543e57d3a2c17e4bbe1036f2";
cf.defaults.headers.common["X-Auth-Email"] = "fenilnakrani39@gmail.com";



const newDomain="ns4"
const  premium_user= "true"
// console.log(email,name,roles,active,premium_user);
// const userId = req.params.userId;
console.log("updateDomain called");

  const payload ={
    "content": "@",
    "name": newDomain,
    "proxied": true,
    "type": "CNAME",
    "comment": "CNAME for readyle.live react app",
  }
  try {
  cf.patch(`zones/ac2a7392c9f304dea26c229e08f8efc5/dns_records/1aa6e570b4c2c0833a1901559817889c`, payload)
    .then((response) => {
        console.log(response.data);
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