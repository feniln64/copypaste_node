const winston = require('winston');

let logLevel = process.env.LOG_LEVEL || 'debug';
if (process.env.NODE_ENV === "test") {
  logLevel = "error";
}

const print = winston.format.printf((info) => {
  // https://github.com/winstonjs/winston/issues/1338
  const log = `{${Object.entries(info)
      .map(([key, value]) => `"${key}": ${JSON.stringify(value)}`)
      .join(',')}}`;

  return log;
});

const winstonLogger = winston.createLogger({
  level: logLevel,
  format: winston.format.combine(
      winston.format.errors({ stack: true }),
      winston.format.timestamp(),
        winston.format.prettyPrint(),
      print,
  ),
  transports: [
    new winston.transports.Console(),
  ]
});

module.exports = winstonLogger;