const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({message:'Unauthorized! Need access token'});
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({message:'Forbidden! Access token expired'});
        }
        req.user = decoded.userInfo.username;
        req.email = decoded.userInfo.email;
        req.roles = decoded.userInfo.roles;
        req.premium_user = decoded.userInfo.premium_user;
        next();
    });
}

module.exports = verifyJWT;