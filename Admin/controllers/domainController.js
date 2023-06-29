const asyncHandler = require('express-async-handler');
// const cf = require('../cloudflare/api')
require('dotenv').config
const createSubdoamin = require('../cloudflare/api')
var dns_record_id=""


// @desc    Get all subdoamins
// @route   GET /subdoamin
// @access  Private
const getAllSubdomain = asyncHandler(async (req, res) => {
  if (!subdomains?.length) {
    return res.status(404).json({ message: "No subdomains found" });
  }
  res.json(subdomains);
})



module.exports = {
  getAllSubdomain,
}