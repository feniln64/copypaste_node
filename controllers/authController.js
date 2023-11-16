const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/model.user');
const Subscription = require('../models/model.subscription');
require('dotenv').config()
const Mailjet = require('node-mailjet');
const bcrypt = require('bcrypt');
const sendmail =require('../functions/sendMail')
var QRCode = require('qrcode')
const AWS = require("aws-sdk");
const { default: axios } = require('axios');


const mailjet = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC,
  apiSecret: process.env.MJ_APIKEY_PRIVATE
});
const BASE_URL = process.env.BASE_URL || 'localhost:9000'


const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY, // store it in .env file to keep it safe
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
var S3_BUCKET = process.env.AWS_BUCKET_NAME;

const cf = axios.create({
  baseURL: 'https://api.cloudflare.com/client/v4'
});
cf.defaults.headers.common["x-auth-key"] = "721d500a5a04d543e57d3a2c17e4bbe1036f2";
cf.defaults.headers.common["X-Auth-Email"] = "fenilnakrani39@gmail.com";

// @desc    create users
// @route   POST /users
// @access  Private
const signupUser = asyncHandler(async (req, res) => {
  const { email, username, name, password } = req.body;
  if (!email || !username || !name || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  // check if user already exists
  const duplicate_email = await User.findOne({ email }).lean().exec();
  if (duplicate_email) {
    return res.status(409).json({ message: "Email is taken" });
  }

  const duplicate_username = await User.findOne({ username }).lean().exec();
  if (duplicate_username) {
    return res.status(409).json({ message: "Username is already taken" });
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const userObject = { email, username, name, "password": hashedPassword };

  const user = await User.create(userObject);


  
  const payload = {
    "content": "@",
    "name": username,
    "proxied": true,
    "type": "CNAME",
    "comment": "CNAME for ready.live react app",
  }

  var opts = {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    quality: 0.3,
    margin: 1,
    version: 9,
    color: {
      dark: "#000000",
      light: "#ffffff"
    }
  }

  QRCode.toDataURL(`http://${username}.cpypst.online`, opts, function (err, qrcode) { // Qr-code is response base64 encoded data (QR code)
    const image_name = Date.now() + "-" + Math.floor(Math.random() * 1000);
    var buf = Buffer.from(qrcode.replace(/^data:image\/\w+;base64,/, ""), 'base64')
    const params = {
      Bucket: S3_BUCKET,
      Key: `${username}/${image_name}.png`, // type is not required
      Body: buf,
      ContentEncoding: 'base64', // required
      ContentType: `image/png` // required. Notice the back ticks
    }
    s3.upload(params, function (err) {
      if (err) {
        console.log('ERROR MSG: ', err);
      } else {
        console.log('Successfully uploaded data');
      }
    });
  });

  // creating subdomain in cloudflare
  try {
    cf.post(`zones/${process.env.CLOUDFLARE_ZONE_ID}/dns_records`, payload)
      .then((response) => {
        const dns_record_id = response.data.result.id
        const subdomainObject = { userId:user["userId"], username, dns_record_id };
        const createSubdomain = Subdomain.create(subdomainObject);

        if (!createSubdomain) {
          return res.status(500).json({ message: "Something went wrong" });
        }

        console.log("subdoamin created")
      })
      .catch((error) => {
        return res.status(409).json({ message: "error in function" });
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
  // const user = 1;
  if (!user) {
    res.status(500).json({ message: "Something went wrong" });
  }
  else {
    const emailVarifyToken = jwt.sign(
      {
        "UserInfo": {

          "username": username,
          "email": email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30m' }
    )

    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
          {
              From: {
                  Email: "account@cpypst.online",
                  Name: "DoCopyPaste"
              },
              To: [
                  {
                      Email: email,
                      Name: name
                  }

              ],
              Subject: "Confirm your email address.",
              TextPart: "Confirm your email address.",
              HTMLPart: `<!DOCTYPE html>
                       <html>
                       <head>
                         <meta charset="utf-8">
                         <meta http-equiv="x-ua-compatible" content="ie=edge">
                         <title>Email Confirmation</title>
                         <meta name="viewport" content="width=device-width, initial-scale=1">
                         <style type="text/css">
                           /**
                                      * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
                                      */
                           @media screen {
                             @font-face {
                               font-family: 'Source Sans Pro';
                               font-style: normal;
                               font-weight: 400;
                               src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
                             }
                    
                             @font-face {
                               font-family: 'Source Sans Pro';
                               font-style: normal;
                               font-weight: 700;
                               src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
                             }
                           }
                    
                      
                           body,
                           table,
                           td,
                           a {
                             -ms-text-size-adjust: 100%;
                             /* 1 */
                             -webkit-text-size-adjust: 100%;
                             /* 2 */
                           }
                  
                           table,
                           td {
                             mso-table-rspace: 0pt;
                             mso-table-lspace: 0pt;
                           }
                    
                       
                           img {
                             -ms-interpolation-mode: bicubic;
                           }
                    
                           /**
                                      * Remove blue links for iOS devices.
                                      */
                           a[x-apple-data-detectors] {
                             font-family: inherit !important;
                             font-size: inherit !important;
                             font-weight: inherit !important;
                             line-height: inherit !important;
                             color: inherit !important;
                             text-decoration: none !important;
                           }
                    
                           div[style*="margin: 16px 0;"] {
                             margin: 0 !important;
                           }
                    
                           body {
                             width: 100% !important;
                             height: 100% !important;
                             padding: 0 !important;
                             margin: 0 !important;
                           }
                           table {
                             border-collapse: collapse !important;
                           }
                           a {
                             color: #1a82e2;
                           }
                           img {
                             height: auto;
                             line-height: 100%;
                             text-decoration: none;
                             border: 0;
                             outline: none;
                           }
                         </style>
                    
                       </head>
                    
                       <body style="background-color: #e9ecef;">
                    
                         <!-- start preheader -->
                         <div class="preheader"
                           style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
                           A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
                         </div>
                         <table border="0" cellpadding="0" cellspacing="0" width="100%">
                           <tr>
                             <td align="center" bgcolor="#e9ecef">
                    
                               <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                 <tr>
                                   <td align="center" valign="top" style="padding: 36px 24px;">
                                     <a href="https://docopypaste.live" target="_blank" style="display: inline-block;">
                                       <img
                                         src="https://objectstorage.us-ashburn-1.oraclecloud.com/p/MTt9dgi_1SieaZ5TKHcmWg4nPJnwybXV8hw-1puABdbXTEIXiiAXuLqRtJN0yzvK/n/idaso8uqtdxu/b/copy_paste/o/public/old.png"
                                         alt="Logo" border="0"  style="display: block; height: 48px; min-width: 48px;">
                                     </a>
                                   </td>
                                 </tr>
                               </table>
                    
                             </td>
                           </tr>
                           <tr>
                             <td align="center" bgcolor="#e9ecef">
                    
                               <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                 <tr>
                                   <td align="left" bgcolor="#ffffff"
                                     style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                                     <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm
                                       Your Email Address</h1>
                                   </td>
                                 </tr>
                               </table>
                    
                             </td>
                           </tr>
                           <tr>
                             <td align="center" bgcolor="#e9ecef">
                               <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                 <tr>
                                   <td align="left" bgcolor="#ffffff"
                                     style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                     <p style="margin: 0;">Tap the button below to confirm your email address. If you didn't create an account
                                       with <a href="https://blogdesire.com">Paste</a>, you can safely delete this email.</p>
                                   </td>
                                 </tr>
                                 <tr>
                                   <td align="left" bgcolor="#ffffff">
                                     <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                       <tr>
                                         <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                                           <table border="0" cellpadding="0" cellspacing="0">
                                             <tr>
                                               <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                                 <a href="${BASE_URL}/auth/varify/email/${emailVarifyToken}" target="_blank"
                                                   style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Verify
                                                   Your email</a>
                                               </td>
                                             </tr>
                                           </table>
                                         </td>
                                       </tr>
                                     </table>
                                   </td>
                                 </tr>
                                 <tr>
                                   <td align="left" bgcolor="#ffffff"
                                     style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                     <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                                     <p style="margin: 0;"><a href="${BASE_URL}/auth/varify/email/${emailVarifyToken}"
                                         target="_blank">${BASE_URL}/auth/varify/email/******</a></p>
                                   </td>
                                 </tr>
                                 <tr>
                                   <td align="left" bgcolor="#ffffff"
                                     style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                                     <p style="margin: 0;">Cheers,<br> Paste</p>
                                   </td>
                                 </tr>
                               </table>
                      
                             </td>
                           </tr>
                         </table>
                       </body>
                       </html>`
          }
      ]
  });
  request
      .then(result => {
          console.log(result.body)
          console.log("email sent successfully ")
      })
      .catch(err => {
          console.log(err.statusCode)
          return res.status(500).json({ message: "Something went wrong email not sent" });
      })
    // const sendemail= await sendmail.sendEmail({email,name,emailVarifyToken}).then(result => console.log(result)).catch(err => console.log(err))
    
    
    // if (!sendemail) return res.status(500).json({ message: "Something went wrong email not sent" });
    return res.status(201).json({ message: `${user} created successfully` });
  }
});

//@desc Login
//@route POST /auth/login
//@access public
const login = asyncHandler(async (req, res) => {

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password both' });
  }

  const foundUser = await User.findOne({ email });

  if (!foundUser || !foundUser.active) {
    return res.status(401).json({ message: 'user is not found or not active' });
  }
  const isMatch = bcrypt.compare(password, foundUser.password)

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid -credentials' });
  }


  const accessToken = jwt.sign(
    {
      "UserInfo": {
        "id": String(foundUser._id),
        "username": foundUser.name,
        "email": foundUser.email,
        "premium_user": foundUser.premium_user,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' }
  )

  const userInfo = {
    "id": String(foundUser._id),
    "username": foundUser.name,
    "email": foundUser.email,
    "premium_user": foundUser.premium_user
  }

  const refreshToken = jwt.sign(
    {
      "UserInfo": {
        "id": String(foundUser._id),
        "username": foundUser.name,
        "email": foundUser.email,
        "premium_user": foundUser.premium_user
      }
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }

  )

  //create cookie wih refresh token
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 24 * 60 * 60  //1d
  })

  return res.status(200).json({ accessToken, userInfo });
});

//@desc Refresh token
//@route GET /auth/refresh
//@access public
const refresh = (req, res) => {

  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401).json({ message: 'Unauthenticated' })
  }
  const refreshToken = cookies.jwt;
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, asyncHandler(async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthenticated' })
    }

    const foundUser = await User.findOne({ email: decoded.UserInfo.email });

    if (!foundUser) {
      return res.status(401).json({ message: 'Unauthenticated' });
    }

    const userInfo = {
      "id": String(foundUser._id),
      "username": foundUser.name,
      "email": foundUser.email,
      "premium_user": foundUser.premium_user
    }

    const accessToken = jwt.sign(
      {
        "UserInfo": {
          "id": String(foundUser._id),
          "username": foundUser.name,
          "email": foundUser.email,
          "premium_user": foundUser.premium_user,
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    )
    res.status(200).json({ accessToken, userInfo })
  }));
}

//@desc Logout
//@route POST /auth/logout
//@access public
const logout = (req, res) => {

  const cookies = req.cookies
  if (!cookies?.jwt) {
    return res.status(204).json({ message: 'Unauthenticated' })
  }
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });
  res.status(200).json({ message: 'Logout Successfully' });
}

const version = (req, res) => {
  
  res.status(200).json({ message: 'V2' });
}

//@desc Forgot Password
//@route POST /auth/forgotPassword
//@access public
const forgotPassword = asyncHandler(async (req, res) => {

  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: 'Please enter email' });
  }

  const foundUser = await User.findOne({ email });

  if (!foundUser || !foundUser.active) {
    res.status(401).json({ message: 'Invalid credentials' });
  }

  const resetToken = foundUser.getResetPasswordToken();
  await foundUser.save();

  const requestUrl = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;

  res.status(200).json({ message: 'OK', requestUrl: requestUrl });
});

//@desc Reset Password
//@route POST /auth/reset-password
//@access public
const resetPassword = asyncHandler(async (req, res) => {

  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetPasswordToken).digest('hex');

  const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

  if (!user) {
    res.status(401).json({ message: 'Invalid token' });
  }

  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;

  await user.save();

  res.status(200).json({ message: 'Password reset successfully!!' });
});

const varifyEmail = asyncHandler(async (req, res) => {
  const token = req.params.token
  console.log("varify email called")
  const varify = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden! Access token expired' })

      if (decoded) return true;

    })
  if (varify) {
    const { username, email } = jwt.decode(token).UserInfo
    const user = await User.findOne({ email: email });
    if (!user) return res.status(401).json({ message: 'User not found' })
    
    user.active = true;
    await user.save();
    return res.status(200).json({ message: 'Email varified successfully' })
  }

  res.status(200).json({ message: 'something went wrong' })
});
module.exports = {
  signupUser,
  login,
  refresh,
  logout,
  forgotPassword,
  resetPassword,
  varifyEmail,
  version
}
