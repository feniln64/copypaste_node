const User = require('../models/model.user');
const Content = require('../models/model.content');
const jwt = require('jsonwebtoken')
const Mailjet = require('node-mailjet');
const mailjet = new Mailjet({
    apiKey: process.env.MJ_APIKEY_PUBLIC,
    apiSecret: process.env.MJ_APIKEY_PRIVATE
});
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { json } = require('body-parser');

// @desc    Get all users
// @route   GET /users
// @access  Private
const getAllUsers = asyncHandler(async (req, res) => {

    const users = await User.find().select('-password').lean();
    if (!users?.length) {
        return res.status(404).json({ message: "No users found" });
    }
    res.json(users);
})


// @desc    create users
// @route   POST /users
// @access  Private

const createNewUser = asyncHandler(async (req, res) => {
    const { email, username, name, password } = req.body;
    const roles = ["admin"];
    // check data
    console.log(email, username, name, password);
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

    const userObject = { email, username, name, "password": hashedPassword, roles };
    console.log("userObject created");
    // create user
    const user = await User.create(userObject);
    if (!user) {
        res.status(500).json({ message: "Something went wrong" });
    } else {
        const request = mailjet
            .post("send", { 'version': 'v3.1' })
            .request({
                "Messages": [
                    {
                        "From": {
                            "Email": "account@cpypst.online",
                            "Name": "DoCopyPaste"
                        },
                        "To": [
                            {
                                "Email": email,
                                "Name": name
                            }
                        ],
                        "Subject": "Your email flight plan!",
                        "TextPart": "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
                        "HTMLPart": `<!DOCTYPE html>
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
                      /**
                       * Avoid browser level font resizing.
                       * 1. Windows Mobile
                       * 2. iOS / OSX
                       */
                      body,
                      table,
                      td,
                      a {
                        -ms-text-size-adjust: 100%; /* 1 */
                        -webkit-text-size-adjust: 100%; /* 2 */
                      }
                      /**
                       * Remove extra space added to tables and cells in Outlook.
                       */
                      table,
                      td {
                        mso-table-rspace: 0pt;
                        mso-table-lspace: 0pt;
                      }
                      /**
                       * Better fluid images in Internet Explorer.
                       */
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
                      /**
                       * Fix centering issues in Android 4.4.
                       */
                      div[style*="margin: 16px 0;"] {
                        margin: 0 !important;
                      }
                      body {
                        width: 100% !important;
                        height: 100% !important;
                        padding: 0 !important;
                        margin: 0 !important;
                      }
                      /**
                       * Collapse table borders to avoid space between cells.
                       */
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
                      <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
                        A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
                      </div>
                      <!-- end preheader -->
                    
                      <!-- start body -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    
                        <!-- start logo -->
                        <tr>
                          <td align="center" bgcolor="#e9ecef">
                            <!--[if (gte mso 9)|(IE)]>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                            <tr>
                            <td align="center" valign="top" width="600">
                            <![endif]-->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                              <tr>
                                <td align="center" valign="top" style="padding: 36px 24px;">
                                  <a href="https://www.blogdesire.com" target="_blank" style="display: inline-block;">
                                    <img src="https://www.blogdesire.com/wp-content/uploads/2019/07/blogdesire-1.png" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
                                  </a>
                                </td>
                              </tr>
                            </table>
                            <!--[if (gte mso 9)|(IE)]>
                            </td>
                            </tr>
                            </table>
                            <![endif]-->
                          </td>
                        </tr>
                        <!-- end logo -->
                    
                        <!-- start hero -->
                        <tr>
                          <td align="center" bgcolor="#e9ecef">
                            <!--[if (gte mso 9)|(IE)]>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                            <tr>
                            <td align="center" valign="top" width="600">
                            <![endif]-->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                              <tr>
                                <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                                  <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
                                </td>
                              </tr>
                            </table>
                            <!--[if (gte mso 9)|(IE)]>
                            </td>
                            </tr>
                            </table>
                            <![endif]-->
                          </td>
                        </tr>
                        <!-- end hero -->
                    
                        <!-- start copy block -->
                        <tr>
                          <td align="center" bgcolor="#e9ecef">
                            <!--[if (gte mso 9)|(IE)]>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                            <tr>
                            <td align="center" valign="top" width="600">
                            <![endif]-->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    
                              <!-- start copy -->
                              <tr>
                                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                  <p style="margin: 0;">Tap the button below to confirm your email address. If you didn't create an account with <a href="https://blogdesire.com">Paste</a>, you can safely delete this email.</p>
                                </td>
                              </tr>
                              <!-- end copy -->
                    
                              <!-- start button -->
                              <tr>
                                <td align="left" bgcolor="#ffffff">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                      <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                                        <table border="0" cellpadding="0" cellspacing="0">
                                          <tr>
                                            <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                              <a href="https://www.blogdesire.com" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Do Something Sweet</a>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <!-- end button -->
                    
                              <!-- start copy -->
                              <tr>
                                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                  <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                                  <p style="margin: 0;"><a href="https://blogdesire.com" target="_blank">https://blogdesire.com/xxx-xxx-xxxx</a></p>
                                </td>
                              </tr>
                              <!-- end copy -->
                    
                              <!-- start copy -->
                              <tr>
                                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                                  <p style="margin: 0;">Cheers,<br> Paste</p>
                                </td>
                              </tr>
                              <!-- end copy -->
                    
                            </table>
                            <!--[if (gte mso 9)|(IE)]>
                            </td>
                            </tr>
                            </table>
                            <![endif]-->
                          </td>
                        </tr>
                        <!-- end copy block -->
                    
                        <!-- start footer -->
                        <tr>
                          <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
                            <!--[if (gte mso 9)|(IE)]>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                            <tr>
                            <td align="center" valign="top" width="600">
                            <![endif]-->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    
                              <!-- start permission -->
                              <tr>
                                <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                                  <p style="margin: 0;">You received this email because we received a request for [type_of_action] for your account. If you didn't request [type_of_action] you can safely delete this email.</p>
                                </td>
                              </tr>
                              <!-- end permission -->
                    
                              <!-- start unsubscribe -->
                              <tr>
                                <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                                  <p style="margin: 0;">To stop receiving these emails, you can <a href="https://www.blogdesire.com" target="_blank">unsubscribe</a> at any time.</p>
                                  <p style="margin: 0;">Paste 1234 S. Broadway St. City, State 12345</p>
                                </td>
                              </tr>
                              <!-- end unsubscribe -->
                    
                            </table>
                            <!--[if (gte mso 9)|(IE)]>
                            </td>
                            </tr>
                            </table>
                            <![endif]-->
                          </td>
                        </tr>
                        <!-- end footer -->
                    
                      </table>
                      <!-- end body -->
                    
                    </body>
                    </html>`
                    }
                ]
            })
        await request
            .then((result) => {
                console.log("Email sent successfully")
            })
            .catch((err) => {
                console.log(err.statusCode)
            })
        
        // console.log("Admin is created");
        res.status(201).json({ message: `${user} created successfully` });
        // res.status(201).json({message: "User created successfully"});
    }
})

// @desc    update user
// @route   POST /user/:userId/update
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
    const { email, name, username } = req.body;


    if (!email || !name, !username) {
        return res.status(400).json({ message: "Email and Name and Username is required" });
    }

    const user = await User.findOne({ _id: req.params.userId }).exec();
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const duplicate_email = await User.findOne({ email }).lean().exec();
    if (duplicate_email) {
        return res.status(409).json({ message: "This email is already exists with another account" });
    }

    const duplicate_username = await User.findOne({ username }).lean().exec();
    if (duplicate_username) {
        return res.status(409).json({ message: "This username is already exists with another account" });
    }

    user.email = email;
    user.name = name;
    user.username = username;

    const updateUser = await user.save();
    if (!updateUser) {
        res.status(500).json({ message: "Something went wrong" });
    } else {
        res.status(200).json({ message: `${name} updated successfully}` });
    }

})

// @desc    update Password
// @route   POST /user/:userId/updatePassword
// @access  Private
const updatePassword = asyncHandler(async (req, res) => {
    const { password } = req.body;


    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    const user = await User.findOne({ _id: req.params.userId }).exec();
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
    }

    const updateUser = await user.save();
    if (!updateUser) {
        res.status(500).json({ message: "Something went wrong" });
    } else {
        res.status(200).json({ message: `Password updated successfully}` });
    }

})

// @desc    delete user
// @route   POST /users
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body;
    console.log("Id is " + id);
    if (!id) {
        return res.status(400).json({ message: "User ID is required" });
    }
    //  check if user has content in the database
    // if yes then ask for delete content and then delete user
    // logic add remaining
    const content = await Content.find({ User: id }).lean().exec();

    const user = await User.findById(id).exec();
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const deleteUser = await user.deleteOne();
    if (!deleteUser) {
        res.status(500).json({ message: "Something went wrong" });
    } else {
        res.status(200).json({ message: `${user.name} deleted successfully}` });
    }
})

const getUser = asyncHandler(async (req, res) => {
    // const user = req.body;
    const userId = req.params.userId;
    // const email = req.query.email; // domaim.com/uri?email=xyz&name=abc
    console.log(userId);
    console.log("get user profile by ID called");
    // const token = req.cookies.jwt;
    // jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, decodedToken) => {
    //     if (err) {
    //         console.log(err.message);
    //         res.locals.user = null;
    //         res.status(401).json({message: "Unauthorized"});
    //     } else {
    //         console.log(decodedToken);
    //     }});
    const user = await User.findOne({ userId }).lean().exec();
    console.log(user);
    return res.status(200).json({ message: user });
    // const {email}=req.body;
    //     console.log("Id is "+email);
    //     if(!email){
    //         return res.status(400).json({message: "User Email is required"});
    //     }

    //     if(!user){
    //         return res.status(404).json({message: "User not found"});
    //     }

    //     res.status(200).json({user});
})





module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getUser,
    updatePassword
}