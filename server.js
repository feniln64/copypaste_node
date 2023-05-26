const express = require('express')
require('dotenv').config
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path')
const {logger} =require('./middleware/logger')
const corsOptions =require('./config/corsOptions')
const dbConnection = require('./config/dbConnection')
const mongoose = require('mongoose') 
const PORT=process.env.PORT || 5000;

const app =express()

// app.use(logger)
app.use(cors())
app.use(cookieParser());
app.use(express.json());

dbConnection()

app.use('/users',require('./routes/userRoutes'))

mongoose.connection.once('open',()=>{
    console.log("MongoDB connection established successfully");
    app.listen(PORT,()=>{
        console.log("server running on port "+PORT);
    })
})

mongoose.connection.on('error',(err)=>{
    console.log("MongoDB connection error. Please make sure MongoDB is running. "+err);
    process.exit();
})