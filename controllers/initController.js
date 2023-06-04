
const asyncHandler = require('express-async-handler');
const { json } = require('body-parser');

// @desc    Get all data
// @route   GET /init
// @access  Public
const initData = asyncHandler(async (req, res) => {
    
    const {domain}=req.body;
    if (!domain) {
        res.status(400)
        throw new Error('Please provide domain');
    }else{
        res.status(200).json({
            domain
        })
    }

    console.log(domain);
})



module.exports = {
    initData
}