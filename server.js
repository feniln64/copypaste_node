const express = require('express')
require('dotenv').config
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path')
const {logger} =require('./middleware/logger')
const corsOptions =require('./config/corsOptions')
const dbConnection = require('./config/dbConnection')
const mongoose = require('mongoose'); 
require('newrelic');


const PORT=process.env.PORT || 9000;

const app =express()

// app.use(logger)
app.use(cors(corsOptions))
app.use(cookieParser());
app.use(express.json());


dbConnection()
app.get('/',(req,res)=>{
   console.log(req.hostname)
    res.send("hello world")
})
app.use('/user',require('./routes/userRoutes'))
app.use('/auth',require('./routes/authRoutes'))
app.use('/subdomain',require('./routes/subdomainRoute'))
app.use('/init',require('./routes/initRoutes'))
app.use('/content',require('./routes/contentRoutes'))

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