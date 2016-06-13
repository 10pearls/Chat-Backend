'use strict';

const config = require('../config');

module.exports = {
  host: config.get('mongodb.hosts')[0],
  db: config.get('mongodb.name'),
  port: config.get('mongodb.port'),
  user: config.get('mongodb.username'),
  password: config.get('mongodb.password'),
  poolSize: config.get('mongodb.poolSize'),
  directory: config.get('mongodb.migrations.directory'),
  collection: config.get('mongodb.migrations.collection')
};
