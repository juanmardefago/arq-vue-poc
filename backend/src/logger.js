const { createLogger, format, transports } = require('winston');
const dailyRotateFile = require('winston-daily-rotate-file');

let logger;
const logFormat = format.combine(
  format.colorize(),
  format.splat(),
  format.timestamp(),
  format.printf(
    log => `[${log.timestamp}] ${log.level}: ${log.message}`
  ),
);

if(process.env.NODE_ENV === 'production') {
  const consoleOptions = {
    level: 'debug'
  };
  const fileOptions = {
    level: 'info',
    maxFiles: '30d',
    dirname: './logs'
  };

  logger = createLogger({
    format: logFormat,
    transports: [
      new transports.Console(consoleOptions),
      new dailyRotateFile(fileOptions),
    ],
  });
} else {
  logger = createLogger({
    level: 'debug',
    format: logFormat,
    transports: [
      new transports.Console()
    ],
  });
}

module.exports = logger;
