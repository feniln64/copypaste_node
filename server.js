const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions');
const dbConnection = require('./config/dbConnection');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const subdomainRoute = require('./routes/subdomainRoute');
const initRoutes = require('./routes/initRoutes');
const contentRoutes = require('./routes/contentRoutes');
const mongoose = require('mongoose');
const serverless = require('serverless-http');
const PORT = process.env.PORT || 9000;
const app = express();

require('dotenv').config

app.use(cors(corsOptions))
app.use(cookieParser());
app.use(express.json());

dbConnection();

app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/subdomain', subdomainRoute);
app.use('/init', initRoutes);
app.use('/content', contentRoutes);

mongoose.connection.once('open', () => {
    console.log("MongoDB connection established successfully");
    app.listen(PORT, () => {
        console.log("server running on port " + PORT);
        console.log("http://localhost:" + PORT);
    });
});

mongoose.connection.on('error', (err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});

module.exports.handler = serverless(app);
