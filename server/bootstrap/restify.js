'use strict';

const restify = require('restify');

module.exports = (server) => {
  server.use(restify.bodyParser({ mapParams: false }));
  server.use(restify.queryParser());
};
