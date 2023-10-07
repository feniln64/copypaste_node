const jwt = require('jsonwebtoken');


const verifyJWT = (req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).send('Unauthorized! Need access token');
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).send('Forbidden! Access token expired');
            }
            req.user = decoded.UserInfo.username;
            req.email = decoded.UserInfo.email;
            req.roles = decoded.UserInfo.roles;
            req.premium_user = decoded.UserInfo.premium_user;
            next();
        });
}

module.exports = verifyJWT;