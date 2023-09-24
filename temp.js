// const { default: axios } = require('axios');
// require('dotenv').config
// const cf = axios.create({
//   baseURL: 'https://api.cloudflare.com/client/v4'
// },
// );
// cf.defaults.headers.common["x-auth-key"] = "721d500a5a04d543e57d3a2c17e4bbe1036f2";
// cf.defaults.headers.common["X-Auth-Email"] = "fenilnakrani39@gmail.com";



// const newDomain="ns4"
// const  premium_user= "true"
// // console.log(email,name,roles,active,premium_user);
// // const userId = req.params.userId;
// console.log("updateDomain called");

//   const payload ={
//     "content": "@",
//     "name": newDomain,
//     "proxied": true,
//     "type": "CNAME",
//     "comment": "CNAME for readyle.live react app",
//   }
//   try {
//   cf.patch(`zones/ac2a7392c9f304dea26c229e08f8efc5/dns_records/1aa6e570b4c2c0833a1901559817889c`, payload)
//     .then((response) => {
//         console.log(response.data);
//     })
//     .catch((error) => {
//       console.log(error);
      
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

const Mailjet = require('node-mailjet');
const mailjet = Mailjet.apiConnect(
 "e4c20c47e0bdbf7f4a16d5af32e6abc3",
 "161623de6ffe3c0c96cf776bb84c86e5"
);
const request = mailjet.post('send', { version: 'v3.1' }).request({
  Messages: [
    {
      From: {
        Email: 'account@cpypst.online',
        Name: 'Me',
      },
      To: [
        {
          Email: 'fenilnakrani39@gmail.com',
          Name: 'You',
        },
      ],
      Subject: 'My first Mailjet Email!',
      TextPart: 'Greetings from Mailjet!',
      HTMLPart:
        '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
    },
  ],
})
request
  .then(result => {
    console.log(result.body)
  })
  .catch(err => {
    console.log(err.statusCode)
  })