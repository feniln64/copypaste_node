const express = require('express');
const cors = require('cors');
const { createServer } = require("http");
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions');
const dbConnection = require('./config/dbConnection');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const subdomainRoute = require('./routes/subdomainRoute');
const initRoutes = require('./routes/initRoutes');
const contentRoutes = require('./routes/contentRoutes');
const permissionRoutes = require('./routes/permissionRoutes');
const logger = require('./config/wtLogger');
var bodyParser = require('body-parser');
const pjson = require('./package.json');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 9000;
const app = express();
const httpServer = createServer(app);
require('dotenv').config

app.use(cors(corsOptions))
app.use(cookieParser());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); 
app.use(express.static("files"));


dbConnection();

app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/subdomain', subdomainRoute);
app.use('/init', initRoutes);
app.use('/content', contentRoutes);
app.use('/permission', permissionRoutes);

mongoose.connection.once('open', () => {
    logger.info("MongoDB connection established successfully");
    httpServer.listen(PORT, () => {
        logger.info("server running on port " + PORT);
        logger.info("http://localhost:" + PORT);
    });
});

mongoose.connection.on('error', (err) => {
    logger.info("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});

