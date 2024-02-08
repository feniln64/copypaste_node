const express = require('express')
const { createServer } = require("http");
const { Server } = require("socket.io");
require('dotenv').config
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {logger} =require('./middleware/logger')
const corsOptions =require('./config/corsOptions')
const dbConnection = require('./config/dbConnection')
const mongoose = require('mongoose'); 
// const Redis = require("ioredis");
// const redis = require('redis');
const {Kafka, logLevel}= require('kafkajs')
const PORT=process.env.PORT || 9000;
var pjson = require('./package.json');
const app =express()
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:3001","https://admin.socket.io"],
      methods: ["*"]
    }
  });

// app.use(logger)
app.use(cors(corsOptions))
app.use(cookieParser());
app.use(express.json());


// Kafka configuration for secured cluster
// const kafka = new Kafka({
// clientId: 'cpypst',
// brokers: ['becoming-sawfly-5472-us1-kafka.upstash.io:9092'],  // Replace with your Kafka broker
// ssl: true,
// sasl: {
//     mechanism: 'scram-sha-256',  // Replace with your SASL mechanism
//     username: 'YmVjb21pbmctc2F3Zmx5LTU0NzIkf0sADzZvZ4XzY9NQejMyWvqOVhmVRbuHpD0',   // Replace with your username
//     password: 'NWI5NzI5MzMtYWMxMS00ZGI4LTg4ZTAtZjk1MjliOGU1NzU1'    // Replace with your password
// },
// logLevel: logLevel.ERROR,
// });

// const kafka = new Kafka({
//   clientId: 'my-app',
//   brokers: ['glider.srvs.cloudkafka.com:9094'],  // Replace with your Kafka broker
//   ssl: true,
//   sasl: {
//       mechanism: 'scram-sha-512',  // Replace with your SASL mechanism
//       username: 'xaqaibsr',   // Replace with your username
//       password: 'GKUitM4qlGjP7SYTEubDyghuaywlJ0a6'    // Replace with your password
//   },
//   logLevel: logLevel.ERROR,
//   });
// const consumer = kafka.consumer({ groupId: 'xaqaibsr-test-group' });

// const main = async () => {
//   await consumer.connect()
//   await consumer.subscribe({ topic: 'xaqaibsr-test', fromBeginning: true })
//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       console.log({
//         value: message.value.toString(),
//         key: message.key.toString(),
//         topic: topic,
//       })
//     },
//   })
// }
// main()
// const redis = new Redis("rediss://default:be41be659f174cf287978f6e72a15e75@intense-doberman-38397.upstash.io:38397");
// const pub = new Redis("rediss://default:be41be659f174cf287978f6e72a15e75@intense-doberman-38397.upstash.io:38397")
// redis.subscribe('user-*',(err, count) => {
//   if (err) {
//     console.error("Failed to subscribe: %s", err.message);
//   } else {
//     console.log(`Subscribed successfully! This client is currently subscribed to ${count} channels.`);
//   }
// });

// redis.on("message", (channel, message) => {
//   console.log(`Received ${message} from ${channel}`);
// });

// const main = () => {
//   redis.psubscribe("user-*", (err, count) => {
//     if (err) console.error(err.message);
//     console.log(`Subscribed to ${count} channels.`);
//   });

//   redis.on("pmessage", (pattern,channel, message) => {
//     console.log(`Received ${message} from ${channel}`);
//     console.log(`Received ${pattern} from ${channel}`);
//   });
// };
// main();
// pub.publish("user-feniln39", "hello"); 


io.on('connection', (socket) => {
    console.info(`Admin Client connected [id=${socket.id}]`);

    socket.on('join_room',room=>{
      socket.join(room)
      console.log("joined room : "+room)
    })

    // send message to room


    socket.on('message',(data)=>{
      socket.to(data.room).emit('message',data.message)
      console.log("message sent from room : ",data)
    })


    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });


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
    httpServer.listen(PORT,()=>{
        console.log("server running on port "+PORT);
    })
})

mongoose.connection.on('error',(err)=>{
    console.log("MongoDB connection error. Please make sure MongoDB is running. "+err);
    process.exit();
})


