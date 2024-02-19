const mongoose = require('mongoose');
const app = require('./src');
const winstonLogger = require('./src/config/winstonLogger');
require('dotenv').config
const PORT = process.env.PORT || 9000;

mongoose.connection.once('open', () => {
  winstonLogger.info("MongoDB connection established successfully");
  app.httpServer.listen(PORT, () => {
      console.log("server running on port " + PORT);
      console.log("http://localhost:" + PORT);
  });
});
mongoose.connection.on('error', (err) => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
  process.exit();
});