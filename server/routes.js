'use strict';

const authentication = require('./middlewares/auth');
const restify = require('restify');
const config = require('../lib/config');
const events = require('./events');
const _ = require('lodash');

module.exports = (server) => {
  server.get(/\/public\/?.*/, restify.serveStatic({
    directory: __dirname
  }));

  server.post('/notify', authentication.isAuthenticated, (req, res, next) => {
    let event = _.result(req, 'body.event');
    if (_.keys(events).indexOf(event) < 0) {
      throw new restify.errors.NotFoundError(`Notification event '${event}' not found`);
    }

    let senderId = _.result(req, 'body.senderId', null);
    let recipientIds = _.result(req, 'body.recipientIds', []);
    let data = _.result(req, 'body.data', {});

    if (!_.isArray(recipientIds)) {
      recipientIds = [recipientIds];
    }
    recipientIds = _.compact(recipientIds);

    data = _.assign(data, {
      event: event,
      appURL: config.get('appURL')
    });

    events[event].notify(senderId, recipientIds, data)
      .then(() => {
        res.send({success: true});
      })
      .catch(next);
  });
};
