const bcrypt=require('bcryptjs')
const jwt =require('jsonwebtoken') 
const asyncHandler= require('express-async-handler')
const loginLimiter = require('../middleware/loginLimiter')
const User = require('../models/model.user')
require('dotenv').config()

//@desc Login
//@route POST /auth/login
//@sccess public
const login = asyncHandler(async (req,res) => {

    const {email,password} = req.body
    if (!email || !password) {
        res.status(400).json({message:'Please provide email and password both'})
    }

    const foundUser = await User.findOne({email})

    if (!foundUser || !foundUser.active) {
        res.status(401).json({message:'Invalid credentials'})
    }
    //remove after testing
    console.log("Login dobe and found user = "+String(foundUser._id))
    const isMatch = await bcrypt.compare(password,foundUser.password)

    if (!isMatch) {
        return res.status(401).json({message:'Invalid credentials'})
    }
 
    const accessToken = jwt.sign(
        {
            "UserInfo":{
                "id": String(foundUser._id),
                "username": foundUser.name,
                "email": foundUser.email,
                "premium_user": foundUser.premium_user,
            },
        },
             process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '1h'}
    )
    const userInfo={
        "id": String(foundUser._id),
        "username": foundUser.name, 
        "email": foundUser.email,
         "premium_user": foundUser.premium_user
         }
    const refreshToken = jwt.sign(
        { "UserInfo":{
            "id": String(foundUser._id),
            "username": foundUser.name, 
            "email": foundUser.email,
             "premium_user": foundUser.premium_user
             }
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '1d'}
         
    )

    //create cookie wih refresh token
    res.cookie('jwt',refreshToken,{
        httpOnly:true,
        secure: true,
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000 //1d
    })

    res.status(200).json({accessToken,userInfo})
})
//@desc Resresh token
//@route GET /auth/refresh
//@sccess public
const refresh =  (req,res) => {

    const cookies = req.cookies
    console.log("refresh token called")
   
    
    if (!cookies?.jwt) {
        console.log("no refresh token found")
        return res.status(401).json({message:'Unauthenticated'})
    }
    const refreshToken = cookies.jwt
    console.log("refresh token found and is "+refreshToken)
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err,decoded) => {
            if (err) {
                return res.status(401).json({message:'Unauthenticated'})
            }   

            const foundUser = await User.findOne({email:decoded.UserInfo.email})
            
            if (!foundUser ) {
                return res.status(401).json({message:'Unauthenticated'})
            }
            const userInfo={
                "id": String(foundUser._id),
                "username": foundUser.name, 
                "email": foundUser.email,
                 "premium_user": foundUser.premium_user
                 }
            const accessToken = jwt.sign(
                {
                    "UserInfo":{
                        "id": String(foundUser._id),
                        "username": foundUser.name,
                        "email": foundUser.email,
                        "premium_user": foundUser.premium_user,
                    }
                },
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn: '1h'}
            )
                res.status(200).json({accessToken,userInfo}) 
        })
    )
}

//@desc Logout
//@route POST /auth/logout
//@sccess public
const logout =  (req,res) => {

    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.status(204).json({message:'Unauthenticated'})
     } 
     res.clearCookie('jwt',{
            httpOnly:true,
            secure: true,
            sameSite: 'None',})
    res.status(200).json({message:'Logout successfull'})
      

}
const varifyEmail =  (req,res) => {
    const token = req.params.token
    console.log("varify email called")
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET, 
        (err, decoded) => {
            if(err) {
                console.log('Forbidden! Access token expired');
            return res.status(403).send('Forbidden! Access token expired');
            }
            if (decoded){
                return res.status(200).json({message:'Email varified'})
            }
    })

    res.status(200).json({message:'Logout successfull'})
}

module.exports={
    login,
    refresh,
    logout,
    varifyEmail
}
