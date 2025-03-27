const winston = require('winston');
const config = require('config');

const {combine, timestamp, json, errors} = winston.format;

const logger = winston.createLogger({
  level: 'info',
  exitOnError: false,
  format: combine(timestamp(), errors({stack: true}), json()),
});

module.exports = logger;
