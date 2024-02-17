const express = require('express');
const cors = require('cors');
const { createServer } = require("http");
const { Server } = require("socket.io");
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions');
const dbConnection = require('./config/dbConnection');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const subdomainRoute = require('./routes/subdomainRoute');
const initRoutes = require('./routes/initRoutes');
const contentRoutes = require('./routes/contentRoutes');
const permissionRoutes = require('./routes/permissionRoutes');
const fileupload = require("express-fileupload");
var bodyParser = require('body-parser');
const {Kafka, logLevel}= require('kafkajs')
const mongoose = require('mongoose');
const PORT = process.env.PORT || 9000;
const app = express();
const httpServer = createServer(app);
const re = new RegExp("(^|^[^:]+:\/\/|[^\.]+\.)cpypst\.online");
const origins=[re,"http://localhost:3001"]
const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3001",
      methods: ["*"],

    }
  });
require('dotenv').config
app.use(fileupload());
app.use(cors(corsOptions))
app.use(cookieParser());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); 
app.use(express.static("files"));

io.on('connection', (socket) => {
    console.info(`Admin Client connected [id=${socket.id}]`);

    socket.on('join_room',room=>{                 // client will emmit message asking to join room
      socket.join(room)                             // server join the room by creating it
      console.log("joined room : "+room)
    })
    // send message to room
    socket.on('message',(data)=>{                        // clinet send message with room and data
      socket.to(data.room).emit('message',data.message)     // server sends message to that particular room 
      console.log("message sent from room : ",data)
    })

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

dbConnection();
app.get('/url',(req,res)=>{
  console.log(req.hostname)
   res.send("hello world version : "+pjson.version)
})
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/subdomain', subdomainRoute);
app.use('/init', initRoutes);
app.use('/content', contentRoutes);
app.use('/permission', permissionRoutes);

mongoose.connection.once('open', () => {
    console.log("MongoDB connection established successfully");
    httpServer.listen(PORT, () => {
        console.log("server running on port " + PORT);
        console.log("http://localhost:" + PORT);
    });
});

mongoose.connection.on('error', (err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});

