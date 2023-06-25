require('dotenv').config

const cf = require('cloudflare')({
    email: "fenilnakrani39@gmail.com",
    key: "721d500a5a04d543e57d3a2c17e4bbe1036f2"
  });

cf.zones.read("ac2a7392c9f304dea26c229e08f8efc5")
.then((response) => {
    console.log(response);
})
.catch((error) => {
    console.log(error);
});
module.exports = cf;