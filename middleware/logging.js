const { json } = require("express");
const date = require('date-and-time');
const logger = require('../config/wtLogger');

const currentDate = new Date(new Date().toLocaleString("en-US", {timeZone: "America/New_York"}));
const time=date.format(currentDate, 'MM/DD/YYYY hh:mm A'); 
const logging =( req, res, next)=> {
    logger.info(req.method + " -> " + req.originalUrl);
    // console.log(req.method);
    // res.json({"method":req.method,"url":req.originalUrl})
    next()
};

module.exports = logging;