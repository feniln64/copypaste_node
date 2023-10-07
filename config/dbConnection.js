const mongoose = require('mongoose');
require('dotenv').config()
const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log("Database Connected");
    }
    catch(err){
        console.log(err)
    }
}

module.exports = dbConnection