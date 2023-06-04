const getIP =( req, res, next)=> {
    
    console.log(req.hostname);
    next()
};


module.exports = getIP;