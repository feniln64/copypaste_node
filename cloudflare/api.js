const { default: axios } = require('axios');

require('dotenv').config


const cf = axios.create({
    baseURL: 'https://api.cloudflare.com/client/v4'
  },
  );


module.exports = {
  createSubdoamin :function (subdomain) {

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
              const record_id=response.data.result.id
              console.log("record id "+record_id);
              return record_id
            })
            .catch((error) => {
              console.log(error);
              return ""
              
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
      }
}

