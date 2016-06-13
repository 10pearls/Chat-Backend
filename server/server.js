'use strict';

const config = require('./config');
const restify = require('restify');
const logger = require('./bootstrap/logger');

var server = restify.createServer({
  name: 'TW-NHQ',
  formatters: {
    'application/json': require('../crust/formatters/json.js')
  },
  log: logger
});

logger.info('Starting TW-NHQ server');

require('./bootstrap/restify')(server);
require('./bootstrap/mongoose')();
require('./apn')()
  .then(require('./socket').bind(this, server.server))
  .then((SocketIO) => {
    logger.info('TW-NHQ socket server started');

    SocketIO.on('connection', (socket) => {
      require('./socketRoutes')(socket);
    });

    require('./routes')(server);
  });

server.listen(config.get('port'), () => {
  logger.info('%s listening at %s in %s environment', server.name, server.url, config.get('env'));
});
