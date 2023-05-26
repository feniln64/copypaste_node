const allowedOrigins = require('./allowedOrigins')

// const corsOptions={
//     origin:(origin,callback)=>{
//         if (allowedOrigins.indexOf(origin)!== -1 || !origin){
//             callback(null,true)
//         }else{
//             callback(new Error('Not allowed by CORS'))
//         }
//     },
//     Credential: true,
//     optionsSuccessStatusCode: 200
// }


var corsOptions = function (req, callback) {
  var corsOptions;
  if (allowedOrigins.indexOf(req.header('Origin')) !== -1 || allowedOrigins) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
module.exports = corsOptions