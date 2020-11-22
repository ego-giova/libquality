import winston from 'winston';

const fs = require('fs');

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

const getLogger = (level, fileName) => winston.createLogger({
  transports: [
    new winston.transports.File({
      name: '',
      level,
      filename: `./logs/${fileName}.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 10,
      colorize: false,
    }),
  ],
  exitOnError: false,
});
const loggers = {};

export default class LoggerManager {
  static serverInternalErrorLogger({ message, stack }) {
    if (!loggers.serverInternalError) {
      loggers.serverInternalError = getLogger('error', 'express-info');
    }

    loggers.serverInternalError.error({ message, stack });
  }

  static expressLogger(message) {
    if (!loggers.expressLogger) {
      loggers.expressLogger = getLogger('info', 'express-info');
    }

    loggers.expressLogger.info(message);
  }

  static databaseLogger(query) {
    if (!loggers.databaseLogger) {
      loggers.databaseLogger = getLogger('info', 'database');
    }

    loggers.databaseLogger.info(query);
  }

  static databaseErrorLogger({ message, stack, sql }) {
    if (!loggers.databaseErrLogger) {
      loggers.databaseErrLogger = getLogger('error', 'database-error');
    }

    loggers.databaseErrLogger.error({ message, stack, sql });
  }

}
