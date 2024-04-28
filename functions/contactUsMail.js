const jwt = require('jsonwebtoken')
require('dotenv').config()
const nodemailer = require("nodemailer");
const BASE_URL = process.env.BASE_URL;
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.BRAVO_SMTP_USER,
    pass: process.env.BRAVO_SMTP_PASSWORD,
  },
});

const contactUsMail = async (email, name,message) => {
 
  const emailData = {
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
                                      <p>${message}</p>
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
      Subject: `message from ${name} and email ${email}`,
    },
  };
  var message = {
    from: " Do Copypaste <email@cpypst.online>",
    to: "dann@syncpoint.tech",
    subject: emailData.Content.Subject,
    text: emailData.Content.Body[1].Content,
    html: emailData.Content.Body[0].Content,
  };
  
    const info = await transporter.sendMail(message);
    console.log("Message sent: %s", info.messageId);
}

module.exports = contactUsMail;