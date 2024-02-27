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

let alignColorsAndTime = winston.format.combine(
    winston.format.colorize({
        all:true
    }),
    winston.format.label({
        label:'[LOGGER]'
    }),
    winston.format.timestamp({
        format:"YY-MM-DD HH:mm:ss"
    }),
    winston.format.printf(
        info => `{ "message" : "${info.message}","level": "${info.level}" ,"timstamp":  ${info.timestamp} }`
    )
);

const logger = winston.createLogger({
    level: "debug",
    transports: [
        new (winston.transports.Console)({
            format: winston.format.combine(winston.format.colorize(), alignColorsAndTime)
        })
    ],
});

module.exports = logger;