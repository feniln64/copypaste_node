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
// var randomstring = require("randomstring");

// console.log(randomstring.generate(7))

// const ElasticEmail = require("@elasticemail/elasticemail-client");
// const defaultClient = ElasticEmail.ApiClient.instance;
// const apikey = defaultClient.authentications["apikey"];
// apikey.apiKey =
//     "D7525C69B59DB4259D4B211F95FA869147FE6F3C0AC644B1AF59E41D045429F45DCD4F52B73FD88C29011004B7A3951E";

// const EmailsApi = new ElasticEmail.EmailsApi();
// const emailData = {
//     Recipients: {
//         To: ["fenilnakrani123@gmail.com"],
//     },
//     Content: {
//         Body: [
//             {
//                 ContentType: "HTML",
//                 Charset: "utf-8",
//                 Content: `<!DOCTYPE html>
//                 <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
                
//                     <head>
//                         <meta charset="utf-8">
//                         <meta name="viewport" content="width=device-width">
//                         <meta http-equiv="X-UA-Compatible" content="IE=edge">
//                         <meta name="x-apple-disable-message-reformatting">
//                         <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
                
//                         <meta name="color-scheme" content="light">
//                         <meta name="supported-color-schemes" content="light">
                
                        
//                         <!--[if !mso]><!-->
                          
//                         <!--<![endif]-->
                
//                         <!--[if mso]>
//                           <style>
//                               // TODO: fix me!
//                               * {
//                                   font-family: sans-serif !important;
//                               }
//                           </style>
//                         <![endif]-->
                    
                        
//                         <!-- NOTE: the title is processed in the backend during the campaign dispatch -->
//                         <title></title>
                
//                         <!--[if gte mso 9]>
//                         <xml>
//                             <o:OfficeDocumentSettings>
//                                 <o:AllowPNG/>
//                                 <o:PixelsPerInch>96</o:PixelsPerInch>
//                             </o:OfficeDocumentSettings>
//                         </xml>
//                         <![endif]-->
                        
//                     <style>
//                         :root {
//                             color-scheme: light;
//                             supported-color-schemes: light;
//                         }
                
//                         html,
//                         body {
//                             margin: 0 auto !important;
//                             padding: 0 !important;
//                             height: 100% !important;
//                             width: 100% !important;
                
//                             overflow-wrap: break-word;
//                             -ms-word-break: break-all;
//                             -ms-word-break: break-word;
//                             word-break: break-all;
//                             word-break: break-word;
//                         }
                
                
                        
//                   direction: undefined;
//                   center,
//                   #body_table{
                    
//                   }
                
//                   .paragraph {
//                     font-size: 14px;
//                     font-family: Helvetica, sans-serif;
//                     color: #5f5f5f;
//                   }
                
//                   ul, ol {
//                     padding: 0;
//                     margin-top: 0;
//                     margin-bottom: 0;
//                   }
                
//                   li {
//                     margin-bottom: 0;
//                   }
                 
//                   .list-block-list-outside-left li {
//                     margin-left: 20px;
//                   }
                
//                   .list-block-list-outside-right li {
//                     margin-right: 20px;
//                   }
                  
//                   .heading1 {
//                     font-weight: 400;
//                     font-size: 28px;
//                     font-family: Helvetica, sans-serif;
//                     color: #616262;
//                   }
                
//                   .heading2 {
//                     font-weight: 400;
//                     font-size: 20px;
//                     font-family: Helvetica, sans-serif;
//                     color: #616262;
//                   }
                
//                   .heading3 {
//                     font-weight: 400;
//                     font-size: 16px;
//                     font-family: Helvetica, sans-serif;
//                     color: #616262;
//                   }
                  
//                   a {
//                     color: #F7920F;
//                     text-decoration: none;
//                   }
                  
                
                
//                         * {
//                             -ms-text-size-adjust: 100%;
//                             -webkit-text-size-adjust: 100%;
//                         }
                
//                         div[style*="margin: 16px 0"] {
//                             margin: 0 !important;
//                         }
                
//                         #MessageViewBody,
//                         #MessageWebViewDiv {
//                             width: 100% !important;
//                         }
                
//                         table {
//                             border-collapse: collapse;
//                             border-spacing: 0;
//                             mso-table-lspace: 0pt !important;
//                             mso-table-rspace: 0pt !important;
//                         }
//                         table:not(.button-table) {
//                             border-spacing: 0 !important;
//                             border-collapse: collapse !important;
//                             table-layout: fixed !important;
//                             margin: 0 auto !important;
//                         }
                
//                         th {
//                             font-weight: normal;
//                         }
                
//                         tr td p {
//                             margin: 0;
//                         }
                
//                         img {
//                             -ms-interpolation-mode: bicubic;
//                         }
                
//                         a[x-apple-data-detectors],
                
//                         .unstyle-auto-detected-links a,
//                         .aBn {
//                             border-bottom: 0 !important;
//                             cursor: default !important;
//                             color: inherit !important;
//                             text-decoration: none !important;
//                             font-size: inherit !important;
//                             font-family: inherit !important;
//                             font-weight: inherit !important;
//                             line-height: inherit !important;
//                         }
                
//                         .im {
//                             color: inherit !important;
//                         }
                
//                         .a6S {
//                             display: none !important;
//                             opacity: 0.01 !important;
//                         }
                
//                         img.g-img+div {
//                             display: none !important;
//                         }
                
//                         @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
//                             u~div .contentMainTable {
//                                 min-width: 320px !important;
//                             }
//                         }
                
//                         @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
//                             u~div .contentMainTable {
//                                 min-width: 375px !important;
//                             }
//                         }
                
//                         @media only screen and (min-device-width: 414px) {
//                             u~div .contentMainTable {
//                                 min-width: 414px !important;
//                             }
//                         }
//                     </style>
                
//                     <style>
//                         @media only screen and (max-device-width: 600px) {
//                             .contentMainTable {
//                                 width: 100% !important;
//                                 margin: auto !important;
//                             }
//                             .single-column {
//                                 width: 100% !important;
//                                 margin: auto !important;
//                             }
//                             .multi-column {
//                                 width: 100% !important;
//                                 margin: auto !important;
//                             }
//                             .imageBlockWrapper {
//                                 width: 100% !important;
//                                 margin: auto !important;
//                             }
//                         }
//                         @media only screen and (max-width: 600px) {
//                             .contentMainTable {
//                                 width: 100% !important;
//                                 margin: auto !important;
//                             }
//                             .single-column {
//                                 width: 100% !important;
//                                 margin: auto !important;
//                             }
//                             .multi-column {
//                                 width: 100% !important;
//                                 margin: auto !important;
//                             }
//                             .imageBlockWrapper {
//                                 width: 100% !important;
//                                 margin: auto !important;
//                             }
//                         }
//                     </style>
//                     <style></style>
                    
//                 <!--[if mso | IE]>
//                     <style>
//                         .list-block-outlook-outside-left {
//                             margin-left: -18px;
//                         }
                    
//                         .list-block-outlook-outside-right {
//                             margin-right: -18px;
//                         }
                
//                     </style>
//                 <![endif]-->
                
                
//                     </head>
                
//                     <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #EFEFEF;">
//                         <center role="article" aria-roledescription="email" lang="en" style="width: 100%; background-color: #EFEFEF;">
//                             <!--[if mso | IE]>
//                             <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" id="body_table" style="background-color: #EFEFEF;">
//                             <tbody>    
//                                 <tr>
//                                     <td>
//                                     <![endif]-->
//                                         <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: auto;" class="contentMainTable">
//                                             <tr class="wp-block-editor-spacerblock-v1"><td style="background-color:#EFEFEF;line-height:30px;font-size:30px;width:100%;min-width:100%">&nbsp;</td></tr><tr class="wp-block-editor-imageblock-v1"><td style="background-color:#EFEFEF;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px" align="center"><table align="center" width="168" class="imageBlockWrapper" style="width:168px" role="presentation"><tbody><tr><td style="padding:0"><img src="https://api.smtprelay.co/userfile/29b1eda2-c583-40d9-abd5-83c12c8aecd0/image.png" width="168" height="" alt="" style="border-radius:0px;display:block;height:auto;width:100%;max-width:100%;border:0" class="g-img"></td></tr></tbody></table></td></tr><tr class="wp-block-editor-headingblock-v1"><td valign="top" style="background-color:#fff;display:block;padding-top:40px;padding-right:20px;padding-bottom:20px;padding-left:20px"><p style="font-family:Helvetica, sans-serif;line-height:32.20px;font-size:28px;background-color:#fff;color:#616262;margin:0;word-break:normal" class="heading1">One more <span style="color:#05a49a">step…</span></p></td></tr><tr class="wp-block-editor-paragraphblock-v1"><td valign="top" style="padding:0px 20px 20px 20px;background-color:#fff"><p class="paragraph" style="font-family:Helvetica, sans-serif;line-height:1.5;font-size:14px;margin:0;color:#5f5f5f;word-break:normal">You've successfully created a CBackup account with&nbsp;<a target="_blank" rel="noreferrer noopener" href="mailto:fenilnakrani64@gmail.com">fenilnakrani64@gmail.com</a>. In order to keep your account safe, please click the link below to&nbsp;verify&nbsp;that this is your email address. The link will expire in 1 hour.</p></td></tr><tr class="wp-block-editor-buttonblock-v1" align="center"><td style="background-color:#fff;padding-top:40px;padding-right:20px;padding-bottom:40px;padding-left:20px;width:100%" valign="top"><table role="presentation" cellspacing="0" cellpadding="0" class="button-table"><tbody><tr><td valign="top" class="button-td button-td-primary" style="cursor:pointer;border:none;border-radius:4px;background-color:#8e1f2c;font-size:16px;font-family:Helvetica, sans-serif;width:fit-content;color:#ffffff"><a style="color:#ffffff" href="{url}">
//                     <table role="presentation">
//                     <tbody><tr>
//                       <!-- Top padding -->
//                       <td valign="top" colspan="3" height="12" style="height: 12px; line-height: 1px; padding: 0;">
//                         &nbsp;
//                       </td>
//                     </tr>
//                     <tr>
//                       <!-- Left padding -->
//                       <td valign="top" width="24" style="width: 24px; line-height: 1px; padding: 0;">
//                         &nbsp;
//                       </td>
//                       <!-- Content -->
//                       <td valign="top" style="
//                         cursor: pointer; border: none; border-radius: 4px; background-color: #8e1f2c; font-size: 16; font-family: Helvetica, sans-serif; width: fit-content; letter-spacing: undefined;
//                           color: #ffffff;
//                           display: block;
//                           padding: 0;
//                         "><a href="http://google.com" style="text-decoration: none; color:white">
//                         Activate your account
//                         </a>
                       
//                       </td>
//                       <!-- Right padding -->
//                       <td valign="top" width="24" style="width: 24px; line-height: 1px; padding: 0;">
//                         &nbsp;
//                       </td>
//                     </tr>
//                     <!-- Bottom padding -->
//                     <tr>
//                       <td valign="top" colspan="3" height="12" style="height: 12px; line-height: 1px; padding: 0;">
//                         &nbsp;
//                       </td>
//                     </tr>
//                   </tbody></table>
//                     </a></td></tr></tbody></table></td></tr><tr class="wp-block-editor-imageblock-v1"><td style="background-color:#fff;padding-top:0;padding-bottom:0;padding-left:0;padding-right:0" align="center"><table align="center" width="600" class="imageBlockWrapper" style="width:600px" role="presentation"><tbody><tr><td style="padding:0"><img src="https://api.smtprelay.co/userfile/a18de9fc-4724-42f2-b203-4992ceddc1de/n_shapes_header1.png" width="600" height="" alt="" style="border-radius:0px;display:block;height:auto;width:100%;max-width:100%;border:0" class="g-img"></td></tr></tbody></table></td></tr><tr class="wp-block-editor-paragraphblock-v1"><td valign="top" style="padding:20px 20px 30px 20px;background-color:#fff"><p class="paragraph" style="font-family:Helvetica, sans-serif;text-align:center;line-height:1.5;font-size:14px;margin:0;color:#5f5f5f;word-break:normal">Need some help? Feel free to <span style="color:#F7920F">contact us</span>.</p></td></tr><tr><td valign="top" align="center" style="padding:30px 30px 30px 30px;background-color:#EFEFEF"><p aria-label="Unsubscribe" class="paragraph" style="font-family:Helvetica, sans-serif;text-align:center;line-height:1.5;font-size:10px;margin:0;color:#5f5f5f;word-break:normal">If you no longer wish to receive mail from us, you can <a href="{unsubscribe}" data-type="mergefield" data-filename="" data-id="fe037dcd-7e93-4317-a5fd-fb37c02237b4-ORjez1cXBII9GhhRF0L7W" class="fe037dcd-7e93-4317-a5fd-fb37c02237b4-ORjez1cXBII9GhhRF0L7W" data-mergefield-value="unsubscribe" data-mergefield-input-value="" style="color: #F7920F;">unsubscribe</a>.<br>{accountaddress}</p></td></tr>
//                                         </table>
//                                     <!--[if mso | IE]>
//                                     </td>
//                                 </tr>
//                             </tbody>
//                             </table>
//                             <![endif]-->
//                         </center>
//                     </body>
//                 </html>`,
//             },
//             {
//                 ContentType: "PlainText",
//                 Charset: "utf-8",
//                 Content:
//                     "Confirm or verify personal, login or account information. cpypst.online will never send an email that asks you to provide, confirm or verify personal, login or account information.",
//             },
//         ],
//         From: "account@cpypst.online",
//         Subject: "Please confirm your Docopypaste account",
//     },
// };

// const callback = (error, data, response) => {
//     if (error) {
//         console.error(error);
//     } else {
//         console.log(response.status)
//         console.log("API called successfully.");
//         console.log("Email sent.");
//     }
// };
// EmailsApi.emailsTransactionalPost(emailData, callback);

// require('dotenv').config();

// // create s3 instance using S3Client 
// // (this is how we create s3 instance in v3)
// const AWS = require("aws-sdk");
// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID, // store it in .env file to keep it safe
//   secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET
// });
// var S3_BUCKET = process.env.AWS_BUCKET_NAME;
// var QRCode = require('qrcode')



// var opts = {
//     errorCorrectionLevel: 'H',
//     type: 'image/png',
//     quality: 0.3,
//     margin: 1,
//     version: 9,
//     color: {
//       dark: "#000000",
//       light: "#ffffff"
//     }
//   }

  
// QRCode.toDataURL(`http://temp.cpypst.online`, opts, function (err,qrcode) { // Qr-code is response base64 encoded data (QR code)
// const image_name = Date.now() + "-" + Math.floor(Math.random() * 1000);
// var buf = Buffer.from(qrcode.replace(/^data:image\/\w+;base64,/, ""), 'base64')
// const params = {
//   Bucket: S3_BUCKET,
//   Key: `temp/${image_name}.png`, // type is not required
//   Body: buf,
//   ContentEncoding: 'base64', // required
//   ContentType: `image/png` // required. Notice the back ticks
// }
// s3.upload(params, function (err) {
//   if (err) {
//     console.log('ERROR MSG: ', err);
//   } else {
//     console.log('Successfully uploaded data');
//   }
// });
// });
// var Fs = require('fs')

// var Minio = require('minio')
// var minioClient = new Minio.Client({
//   endPoint: '207.211.187.125',
//   port: 9000,
//   useSSL: false,
//   accessKey: 'pPAzlk6rv4x34C6GoJEd',
//   secretKey: 'aYuVmUYJonn7ESKAcDOop1O2dEca0v3RipG3FUUx',
// })
// const username="dann";
// await minioClient.presignedUrl('GET', 'docopypaste', `${username}/profile.png`, 24 * 60 * 60, function (err, presignedUrl) {
//   if (err) return console.log(err); 
//   console.log(presignedUrl)
// return res.status(200).json({ signedUrl:presignedUrl });
// })

// var opts = {
//   errorCorrectionLevel: 'H',
//   type: 'image/png',
//   quality: 0.3,
//   margin: 1,
//   version: 9,
//   color: {
//     dark: "#000000",
//     light: "#ffffff"
//   }
// }
// const image_name = username
// QRCode.toDataURL(`http://${username}.cpypst.online`, opts, function (err, qrcode) { // Qr-code is response base64 encoded data (QR code)
  
//   var buf = Buffer.from(qrcode.replace(/^data:image\/\w+;base64,/, ""), 'base64')
  
   
//     minioClient.putObject('docopypaste',`qr/${username}/${image_name}.png`, buf, function (err, objInfo) {
//       if (err) {
//         return console.log(err) // err should be null
//       }
//       console.log('Success', objInfo)
//     })
// })
const SibApiV3Sdk = require('@getbrevo/brevo');

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

let apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey = "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";

let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); 
const emailData = {
  Recipients: {
    To: ["dannranny@gmail.com"],
  },
  Content: {
    Body: [
      {
        ContentType: "HTML",
        Charset: "utf-8",
        Content: `<!DOCTYPE html>
              <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
              
                  <head>
                      <meta charset="utf-8">
                      <meta name="viewport" content="width=device-width">
                      <meta http-equiv="X-UA-Compatible" content="IE=edge">
                      <meta name="x-apple-disable-message-reformatting">
                      <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
              
                      <meta name="color-scheme" content="light">
                      <meta name="supported-color-schemes" content="light">
              
                      
                      <!--[if !mso]><!-->
                        
                      <!--<![endif]-->
              
                      <!--[if mso]>
                        <style>
                            // TODO: fix me!
                            * {
                                font-family: sans-serif !important;
                            }
                        </style>
                      <![endif]-->
                  
                      
                      <!-- NOTE: the title is processed in the backend during the campaign dispatch -->
                      <title></title>
              
                      <!--[if gte mso 9]>
                      <xml>
                          <o:OfficeDocumentSettings>
                              <o:AllowPNG/>
                              <o:PixelsPerInch>96</o:PixelsPerInch>
                          </o:OfficeDocumentSettings>
                      </xml>
                      <![endif]-->
                      
                  <style>
                      :root {
                          color-scheme: light;
                          supported-color-schemes: light;
                      }
              
                      html,
                      body {
                          margin: 0 auto !important;
                          padding: 0 !important;
                          height: 100% !important;
                          width: 100% !important;
              
                          overflow-wrap: break-word;
                          -ms-word-break: break-all;
                          -ms-word-break: break-word;
                          word-break: break-all;
                          word-break: break-word;
                      }
              
              
                      
                direction: undefined;
                center,
                #body_table{
                  
                }
              
                .paragraph {
                  font-size: 14px;
                  font-family: Helvetica, sans-serif;
                  color: #5f5f5f;
                }
              
                ul, ol {
                  padding: 0;
                  margin-top: 0;
                  margin-bottom: 0;
                }
              
                li {
                  margin-bottom: 0;
                }
               
                .list-block-list-outside-left li {
                  margin-left: 20px;
                }
              
                .list-block-list-outside-right li {
                  margin-right: 20px;
                }
                
                .heading1 {
                  font-weight: 400;
                  font-size: 28px;
                  font-family: Helvetica, sans-serif;
                  color: #616262;
                }
              
                .heading2 {
                  font-weight: 400;
                  font-size: 20px;
                  font-family: Helvetica, sans-serif;
                  color: #616262;
                }
              
                .heading3 {
                  font-weight: 400;
                  font-size: 16px;
                  font-family: Helvetica, sans-serif;
                  color: #616262;
                }
                
                a {
                  color: #F7920F;
                  text-decoration: none;
                }
                
              
              
                      * {
                          -ms-text-size-adjust: 100%;
                          -webkit-text-size-adjust: 100%;
                      }
              
                      div[style*="margin: 16px 0"] {
                          margin: 0 !important;
                      }
              
                      #MessageViewBody,
                      #MessageWebViewDiv {
                          width: 100% !important;
                      }
              
                      table {
                          border-collapse: collapse;
                          border-spacing: 0;
                          mso-table-lspace: 0pt !important;
                          mso-table-rspace: 0pt !important;
                      }
                      table:not(.button-table) {
                          border-spacing: 0 !important;
                          border-collapse: collapse !important;
                          table-layout: fixed !important;
                          margin: 0 auto !important;
                      }
              
                      th {
                          font-weight: normal;
                      }
              
                      tr td p {
                          margin: 0;
                      }
              
                      img {
                          -ms-interpolation-mode: bicubic;
                      }
              
                      a[x-apple-data-detectors],
              
                      .unstyle-auto-detected-links a,
                      .aBn {
                          border-bottom: 0 !important;
                          cursor: default !important;
                          color: inherit !important;
                          text-decoration: none !important;
                          font-size: inherit !important;
                          font-family: inherit !important;
                          font-weight: inherit !important;
                          line-height: inherit !important;
                      }
              
                      .im {
                          color: inherit !important;
                      }
              
                      .a6S {
                          display: none !important;
                          opacity: 0.01 !important;
                      }
              
                      img.g-img+div {
                          display: none !important;
                      }
              
                      @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
                          u~div .contentMainTable {
                              min-width: 320px !important;
                          }
                      }
              
                      @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
                          u~div .contentMainTable {
                              min-width: 375px !important;
                          }
                      }
              
                      @media only screen and (min-device-width: 414px) {
                          u~div .contentMainTable {
                              min-width: 414px !important;
                          }
                      }
                  </style>
              
                  <style>
                      @media only screen and (max-device-width: 600px) {
                          .contentMainTable {
                              width: 100% !important;
                              margin: auto !important;
                          }
                          .single-column {
                              width: 100% !important;
                              margin: auto !important;
                          }
                          .multi-column {
                              width: 100% !important;
                              margin: auto !important;
                          }
                          .imageBlockWrapper {
                              width: 100% !important;
                              margin: auto !important;
                          }
                      }
                      @media only screen and (max-width: 600px) {
                          .contentMainTable {
                              width: 100% !important;
                              margin: auto !important;
                          }
                          .single-column {
                              width: 100% !important;
                              margin: auto !important;
                          }
                          .multi-column {
                              width: 100% !important;
                              margin: auto !important;
                          }
                          .imageBlockWrapper {
                              width: 100% !important;
                              margin: auto !important;
                          }
                      }
                  </style>
                  <style></style>
                  
              <!--[if mso | IE]>
                  <style>
                      .list-block-outlook-outside-left {
                          margin-left: -18px;
                      }
                  
                      .list-block-outlook-outside-right {
                          margin-right: -18px;
                      }
              
                  </style>
              <![endif]-->
              
              
          </head>
              
          <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #EFEFEF;">
              <center role="article" aria-roledescription="email" lang="en" style="width: 100%; background-color: #EFEFEF;">
                          <!--[if mso | IE]>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" id="body_table" style="background-color: #EFEFEF;">
                  <tbody>    
                      <tr>
                          <td>
                          <![endif]-->
                              <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: auto;" class="contentMainTable">
                                  <tr class="wp-block-editor-spacerblock-v1"><td style="background-color:#EFEFEF;line-height:30px;font-size:30px;width:100%;min-width:100%">&nbsp;</td></tr><tr class="wp-block-editor-imageblock-v1"><td style="background-color:#EFEFEF;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px" align="center"><table align="center" width="168" class="imageBlockWrapper" style="width:168px" role="presentation"><tbody><tr><td style="padding:0"><img src="https://api.smtprelay.co/userfile/29b1eda2-c583-40d9-abd5-83c12c8aecd0/image.png" width="168" height="" alt="" style="border-radius:0px;display:block;height:auto;width:100%;max-width:100%;border:0" class="g-img"></td></tr></tbody></table></td></tr><tr class="wp-block-editor-headingblock-v1"><td valign="top" style="background-color:#fff;display:block;padding-top:40px;padding-right:20px;padding-bottom:20px;padding-left:20px"><p style="font-family:Helvetica, sans-serif;line-height:32.20px;font-size:28px;background-color:#fff;color:#616262;margin:0;word-break:normal" class="heading1">One more <span style="color:#05a49a">step…</span></p></td></tr><tr class="wp-block-editor-paragraphblock-v1"><td valign="top" style="padding:0px 20px 20px 20px;background-color:#fff"><p class="paragraph" style="font-family:Helvetica, sans-serif;line-height:1.5;font-size:14px;margin:0;color:#5f5f5f;word-break:normal">You've successfully created a CBackup account with&nbsp;<a target="_blank" rel="noreferrer noopener" href="mailto:fenilnakrani64@gmail.com">fenilnakrani64@gmail.com</a>. In order to keep your account safe, please click the link below to&nbsp;verify&nbsp;that this is your email address. The link will expire in 1 hour.</p></td></tr><tr class="wp-block-editor-buttonblock-v1" align="center"><td style="background-color:#fff;padding-top:40px;padding-right:20px;padding-bottom:40px;padding-left:20px;width:100%" valign="top"><table role="presentation" cellspacing="0" cellpadding="0" class="button-table"><tbody><tr><td valign="top" class="button-td button-td-primary" style="cursor:pointer;border:none;border-radius:4px;background-color:#8e1f2c;font-size:16px;font-family:Helvetica, sans-serif;width:fit-content;color:#ffffff"><a style="color:#ffffff" href="{url}">
                                  <table role="presentation">
                                  <tbody><tr>
                                    <!-- Top padding -->
                                    <td valign="top" colspan="3" height="12" style="height: 12px; line-height: 1px; padding: 0;">
                                      &nbsp;
                                    </td>
                                  </tr>
                                  <tr>
                                    <!-- Left padding -->
                                    <td valign="top" width="24" style="width: 24px; line-height: 1px; padding: 0;">
                                      &nbsp;
                                    </td>
                                    <!-- Content -->
                                    <td valign="top" style="
                                      cursor: pointer; border: none; border-radius: 4px; background-color: #8e1f2c; font-size: 16; font-family: Helvetica, sans-serif; width: fit-content; letter-spacing: undefined;
                                        color: #ffffff;
                                        display: block;
                                        padding: 0;
                                      Activate your account
                                      </a>

                                    </td>
                                    <!-- Right padding -->
                                    <td valign="top" width="24" style="width: 24px; line-height: 1px; padding: 0;">
                                      &nbsp;
                                    </td>
                                  </tr>
                                  <!-- Bottom padding -->
                                  <tr>
                                    <td valign="top" colspan="3" height="12" style="height: 12px; line-height: 1px; padding: 0;">
                                      &nbsp;
                                    </td>
                                  </tr>
                    </tbody>
                  </table>
                  </a>
                  </td>
                  </tr>
                  </tbody>
                  </table></td></tr><tr class="wp-block-editor-imageblock-v1"><td style="background-color:#fff;padding-top:0;padding-bottom:0;padding-left:0;padding-right:0" align="center"><table align="center" width="600" class="imageBlockWrapper" style="width:600px" role="presentation"><tbody><tr><td style="padding:0"><img src="https://api.smtprelay.co/userfile/a18de9fc-4724-42f2-b203-4992ceddc1de/n_shapes_header1.png" width="600" height="" alt="" style="border-radius:0px;display:block;height:auto;width:100%;max-width:100%;border:0" class="g-img"></td></tr></tbody></table></td></tr><tr class="wp-block-editor-paragraphblock-v1"><td valign="top" style="padding:20px 20px 30px 20px;background-color:#fff"><p class="paragraph" style="font-family:Helvetica, sans-serif;text-align:center;line-height:1.5;font-size:14px;margin:0;color:#5f5f5f;word-break:normal">Need some help? Feel free to <span style="color:#F7920F">contact us</span>.</p></td></tr><tr><td valign="top" align="center" style="padding:30px 30px 30px 30px;background-color:#EFEFEF"><p aria-label="Unsubscribe" class="paragraph" style="font-family:Helvetica, sans-serif;text-align:center;line-height:1.5;font-size:10px;margin:0;color:#5f5f5f;word-break:normal">If you no longer wish to receive mail from us, you can <a href="{unsubscribe}" data-type="mergefield" data-filename="" data-id="fe037dcd-7e93-4317-a5fd-fb37c02237b4-ORjez1cXBII9GhhRF0L7W" class="fe037dcd-7e93-4317-a5fd-fb37c02237b4-ORjez1cXBII9GhhRF0L7W" data-mergefield-value="unsubscribe" data-mergefield-input-value="" style="color: #F7920F;">unsubscribe</a>.<br>{accountaddress}</p></td></tr>
                  </table>
                                  <!--[if mso | IE]>
                                  </td>
                              </tr>
                          </tbody>
                          </table>
                          <![endif]-->
                      </center>
                  </body>
              </html>`,
      },
      {
        ContentType: "PlainText",
        Charset: "utf-8",
        Content:
          "Confirm or verify personal, login or account information. cpypst.online will never send an email that asks you to provide, confirm or verify personal, login or account information.",
      },
    ],
    From: "email@cpypst.online",
    Subject: "Please confirm your Docopypaste account",
  },
};

// sendSmtpEmail.subject= emailData.Content.Subject;
// sendSmtpEmail.htmlContent= emailData.Content.Body[0].Content;
// sendSmtpEmail.to= [{"email":emailData.Recipients.To[0],"name":"Jane Doe"}];
// sendSmtpEmail.sender= {"name":"Cpypst","email":"email@cpypst.online"};

// apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
//   console.log('EMAIL API called successfully. Returned data: ' + JSON.stringify(data));

// }, function(error) {
//   console.error(error);
// });

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "dannranny@gmail.com",
    pass: "Gt2hLwydKrvAC3zP",
  },
});

var message = {
  from: " Do Copypaste <email@cpypst.online>",
  to: emailData.Recipients.To[0],
  subject: emailData.Content.Subject,
  text: emailData.Content.Body[1].Content,
  html: emailData.Content.Body[0].Content,
};

async function main() {
  const info = await transporter.sendMail(message);
  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);