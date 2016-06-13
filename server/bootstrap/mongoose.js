'use strict';

const mongoose = require('mongoose');
const sharedConfig = require('../../lib/config');
const logger = require('./logger');
mongoose.Promise = global.Promise;

module.exports = () => {

  let config = {
    hosts: sharedConfig.get('mongodb.hosts').join(','),
    db: sharedConfig.get('mongodb.name'),
    options: {
      user: sharedConfig.get('mongodb.username'),
      pass: sharedConfig.get('mongodb.password')
    },
    rsName: sharedConfig.get('mongodb.replicaSet.name'),
    readPreference: sharedConfig.get('mongodb.replicaSet.readPreference')
  };

  if (config.rsName) {
    config.options.replset = {
      rs_name: config.rsName,
      readPreference: config.readPreference
    };
  }

  mongoose.connection.on('open', () => {
    config.hosts.split(',').forEach((host) => {
      logger.debug(`MongoDB Connected at ${host}`);
    });
  });

  mongoose.connection.on('error', (err) => {
    logger.error(err);
  });

  mongoose.connection.on('disconnect', () => {
    logger.error(`MongoDB Disconnected`);
  });

  mongoose.connect(`mongodb://${config.hosts}/${config.db}`, config.options);
};
