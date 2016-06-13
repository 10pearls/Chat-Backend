'use strict';

const fs = require('fs');
const path = require('path');
const bunyan = require('bunyan');
const Loggly = require('bunyan-loggly');
const sharedConfig = require('../config/index');

/*
 * configure and start logger
 * @param {Object} config The configuration object for defining dir: log directory, level: loglevel
 * @return the created logger instance
 */
let Logger = (appName, config) => {

  let logDir = config.dir || path.join(__dirname, '../../logs');
  let logFile = path.join(logDir, 'debug.json');
  let logErrorFile = path.join(logDir, 'error.json');

  // Create log directory if it doesnt exist
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  // Log to console and log file
  return bunyan.createLogger({
    name: appName,
    streams: [
      {
        stream: new Loggly({
          token: sharedConfig.get('loggly.token'),
          subdomain: sharedConfig.get('loggly.subdomain'),
          tags: [sharedConfig.get('env')]
        }),
        type: 'raw',
        level: 'debug'
      },
      {
        stream: process.stdout,
        level: 'debug'
      },
      {
        path: logFile,
        level: 'debug',
        type: 'rotating-file',
        period: '1d'
      },
      {
        path: logErrorFile,
        level: 'error',
        type: 'rotating-file',
        period: '1d'
      }
    ],
    serializers: bunyan.stdSerializers
  });
};

module.exports = Logger;
