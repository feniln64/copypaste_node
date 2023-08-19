const express = require('express')
require('dotenv').config
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path')
const {logger} =require('./middleware/logger')
const corsOptions =require('./config/corsOptions')
const dbConnection = require('./config/dbConnection')
const mongoose = require('mongoose'); 
const serverless = require('serverless-http');
const PORT=process.env.PORT || 9000;
var pjson = require('./package.json');
const swaggerUi = require('swagger-ui-express');
const swaggerjsDoc = require('swagger-jsdoc');
const app =express()

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Content Management System',
            description: 'Content Management System API Information',
            contact: {
                name: "Amazing Developer"
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis: ["./routes/*.js"]
}

const swaggerDocs = swaggerjsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// app.use(logger)
app.use(cors(corsOptions))
app.use(cookieParser());
app.use(express.json());


dbConnection()
app.get('/',(req,res)=>{
   console.log(req.hostname)
    res.send("hello world version : "+pjson.version)
})
app.get('/url',(req,res)=>{
    console.log(req.hostname)
     res.send("hello world version : "+pjson.version)
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

module.exports.handler = serverless(app);
