const jwt = require('jsonwebtoken');


const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    
    if(!authHeader?.startsWith('Bearer ')) {
        return res.status(401).send('Unauthorized');
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET, 
        (err, decoded) => {
            if(err) {
            return res.status(403).send('Forbidden');
            }

        // console.log(decoded);
        req.user = decoded.UserInfo.username;
        req.email = decodec.UserInfo.email;
        next();
    })
}   

module.exports = verifyJWT;