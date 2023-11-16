// const Mailjet = require('node-mailjet');

// const mailjet = new Mailjet({
//   apiKey: "e4c20c47e0bdbf7f4a16d5af32e6abc3",
//   apiSecret: "161623de6ffe3c0c96cf776bb84c86e5"
// });
// const BASE_URL = process.env.BASE_URL || 'localhost:9000'

// const request = mailjet.post("send", { version: "v3.1" }).request({
//   Messages: [
//       {
//           From: {
//               Email: "account@cpypst.online",
//               Name: "DoCopyPaste"
//           },
//           To: [
//               {
//                   Email: "fenilnakrani39@gmail.com",
//                   Name: "fenil"
//               }

//           ],
//           Subject: "Confirm your email address.",
//           TextPart: "Confirm your email address.",
//           HTMLPart: `<!DOCTYPE html>
//                    <html>
//                    <head>
//                      <meta charset="utf-8">
//                      <meta http-equiv="x-ua-compatible" content="ie=edge">
//                      <title>Email Confirmation</title>
//                      <meta name="viewport" content="width=device-width, initial-scale=1">
//                      <style type="text/css">
//                        /**
//                                   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
//                                   */
//                        @media screen {
//                          @font-face {
//                            font-family: 'Source Sans Pro';
//                            font-style: normal;
//                            font-weight: 400;
//                            src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
//                          }
                
//                          @font-face {
//                            font-family: 'Source Sans Pro';
//                            font-style: normal;
//                            font-weight: 700;
//                            src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
//                          }
//                        }
                
                  
//                        body,
//                        table,
//                        td,
//                        a {
//                          -ms-text-size-adjust: 100%;
//                          /* 1 */
//                          -webkit-text-size-adjust: 100%;
//                          /* 2 */
//                        }
              
//                        table,
//                        td {
//                          mso-table-rspace: 0pt;
//                          mso-table-lspace: 0pt;
//                        }
                
                   
//                        img {
//                          -ms-interpolation-mode: bicubic;
//                        }
                
//                        /**
//                                   * Remove blue links for iOS devices.
//                                   */
//                        a[x-apple-data-detectors] {
//                          font-family: inherit !important;
//                          font-size: inherit !important;
//                          font-weight: inherit !important;
//                          line-height: inherit !important;
//                          color: inherit !important;
//                          text-decoration: none !important;
//                        }
                
//                        div[style*="margin: 16px 0;"] {
//                          margin: 0 !important;
//                        }
                
//                        body {
//                          width: 100% !important;
//                          height: 100% !important;
//                          padding: 0 !important;
//                          margin: 0 !important;
//                        }
//                        table {
//                          border-collapse: collapse !important;
//                        }
//                        a {
//                          color: #1a82e2;
//                        }
//                        img {
//                          height: auto;
//                          line-height: 100%;
//                          text-decoration: none;
//                          border: 0;
//                          outline: none;
//                        }
//                      </style>
                
//                    </head>
                
//                    <body style="background-color: #e9ecef;">
                
//                      <!-- start preheader -->
//                      <div class="preheader"
//                        style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
//                        A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
//                      </div>
//                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
//                        <tr>
//                          <td align="center" bgcolor="#e9ecef">
                
//                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
//                              <tr>
//                                <td align="center" valign="top" style="padding: 36px 24px;">
//                                  <a href="https://docopypaste.live" target="_blank" style="display: inline-block;">
//                                    <img
//                                      src="https://objectstorage.us-ashburn-1.oraclecloud.com/p/MTt9dgi_1SieaZ5TKHcmWg4nPJnwybXV8hw-1puABdbXTEIXiiAXuLqRtJN0yzvK/n/idaso8uqtdxu/b/copy_paste/o/public/old.png"
//                                      alt="Logo" border="0"  style="display: block; height: 48px; min-width: 48px;">
//                                  </a>
//                                </td>
//                              </tr>
//                            </table>
                
//                          </td>
//                        </tr>
//                        <tr>
//                          <td align="center" bgcolor="#e9ecef">
                
//                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
//                              <tr>
//                                <td align="left" bgcolor="#ffffff"
//                                  style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
//                                  <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm
//                                    Your Email Address</h1>
//                                </td>
//                              </tr>
//                            </table>
                
//                          </td>
//                        </tr>
//                        <tr>
//                          <td align="center" bgcolor="#e9ecef">
//                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
//                              <tr>
//                                <td align="left" bgcolor="#ffffff"
//                                  style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
//                                  <p style="margin: 0;">Tap the button below to confirm your email address. If you didn't create an account
//                                    with <a href="https://blogdesire.com">Paste</a>, you can safely delete this email.</p>
//                                </td>
//                              </tr>
//                              <tr>
//                                <td align="left" bgcolor="#ffffff">
//                                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
//                                    <tr>
//                                      <td align="center" bgcolor="#ffffff" style="padding: 12px;">
//                                        <table border="0" cellpadding="0" cellspacing="0">
//                                          <tr>
//                                            <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
//                                              <a href="${BASE_URL}/auth/varify/email/" target="_blank"
//                                                style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Verify
//                                                Your email</a>
//                                            </td>
//                                          </tr>
//                                        </table>
//                                      </td>
//                                    </tr>
//                                  </table>
//                                </td>
//                              </tr>
//                              <tr>
//                                <td align="left" bgcolor="#ffffff"
//                                  style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
//                                  <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
//                                  <p style="margin: 0;"><a href="${BASE_URL}/auth/varify/email/"
//                                      target="_blank">${BASE_URL}/auth/varify/email/******</a></p>
//                                </td>
//                              </tr>
//                              <tr>
//                                <td align="left" bgcolor="#ffffff"
//                                  style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
//                                  <p style="margin: 0;">Cheers,<br> Paste</p>
//                                </td>
//                              </tr>
//                            </table>
                  
//                          </td>
//                        </tr>
//                      </table>
//                    </body>
//                    </html>`
//       }
//   ]
// });
// request
//   .then(result => {
//       console.log(result.response.status)
//       console.log("email sent successfully ")
//   })
//   .catch(err => {
//       console.log(err.statusCode)
//       return json({ message: "Something went wrong email not sent" });
//   })
// const mailchimpTx = require("@mailchimp/mailchimp_transactional/src/index.js")("42405dfe4b0db55b4e71573ea28b48af-us21");

// async function run() {
//   const response = await mailchimpTx.users.ping();
//   console.log(response);
// }

// run();
var randomstring = require("randomstring");

console.log(randomstring.generate(7))