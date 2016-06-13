'use strict';

const Logger = require('../../lib/logger');
const config = require('../config');

let logger;

module.exports = (() => {
  logger = logger ? logger : Logger('Chat-BE', {
    dir: config.get('logs.dir')
  });
  return logger;
})();
