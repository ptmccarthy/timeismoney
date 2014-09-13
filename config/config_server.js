var config = {};

// general server settings
config.port = '80';
config.databaseName = 'tim';
config.mongoURL = 'localhost:27017/' + config.databaseName;

// logging settings
// for lvels use standard syslog severity levels
config.consoleLogLevel = 'info';
config.fileLogLevel = 'debug';
config.morganLogFormat = 'dev';
config.logFile = './logs/tim.log';
config.maxLogFileSize = 4194304; // bytes

// export config
module.exports = config;
