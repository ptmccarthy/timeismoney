var config = require('./config/config_server');
var fs = require('fs');

// external libraries
var winston = require('winston');

if (!fs.existsSync('./logs')) { 
  fs.mkdirSync('./logs')
}

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: config.consoleLogLevel,
      colorize: true
    }),
    new (winston.transports.File)({ 
      level: config.fileLogLevel,
      filename: config.logFile
    })
  ]

});

module.exports = logger;

// morgan http logger middleware uses this winston stream
//   note: can change logger to different level here for http requests
module.exports.stream = {
  write: function(message, encoding) {
    logger.info(message);
  }
};
