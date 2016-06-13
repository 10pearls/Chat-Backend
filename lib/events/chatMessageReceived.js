'use strict';

const helpers = require('../helpers');
const templates = require('../templates');
const _ = require('lodash');

module.exports = {
  notify
};

const webMessageTemplate = templates.chatMessageReceived.webMessage;
const mobileMessageTemplate = templates.chatMessageReceived.mobileMessage;

function notify(senderId, recipientIds, data) {
  recipientIds = _.reject(recipientIds, (userId) => {
    return userId === senderId;
  });

  return Promise.all([
    helpers.notification.send(senderId, data),
    helpers.notification.send(recipientIds, data, {web: webMessageTemplate, mobile: mobileMessageTemplate})
  ]);
}
