const rateLimit =require('express-rate-limit')

const loginLimiter =rateLimit({
    windowMS: 60*1000, // 1 minute
    max: 5,
    message:{
        message: 'To many login attempts from this IP try again after 60 second'
    },
    handler: (req,res,next,options) =>{
        console.log('test')
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true,
    legacyHeaders: false
});

module.exports = loginLimiter