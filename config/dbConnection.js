const mongoose = require('mongoose');
const logger = require('./wtLogger');
require('dotenv').config()

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        logger.info("Database Connected");
    }
    catch (err) {
        logger.info(err)
    }
}

module.exports = dbConnection