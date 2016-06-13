'use strict';

const apnHelper = require('./apn');
const pubsubHelper = require('./pubsub');
const repos = require('../repositories');
const constants = require('../constants');
const sharedRepos = require('../../lib/repositories');
const sharedEnums = require('../../lib/enums');
const _ = require('lodash');

module.exports = {
  send,
  sendMobileNotif
};

function send(recipientIds, data, templates) {
  templates = templates || {};
  return sharedRepos.token.findByUserIds(recipientIds)
    .then((tokens) => {
      let executions = [];

      for (let token of tokens) {
        let payload = _.cloneDeep(data);

        payload.deviceType = token.deviceType;
        payload.pushToken = token.pushToken;

        if (token.deviceType === sharedEnums.user.deviceType.web) {
          payload.message = templates.web && templates.web(payload);
        }

        if (token.deviceType === sharedEnums.user.deviceType.ios) {
          payload.message = templates.mobile && templates.mobile(payload);
        }

        executions.push(sendEvent(token.userId, payload, token.deviceType));
      }

      return Promise.all(executions);
    });
}

function sendEvent(userId, data, deviceType) {
  return repos.user.findSocketsByUserId(userId, deviceType)
    .then((socketIds) => {
      data.userId = userId;
      data.deviceType = deviceType;

      if (!socketIds.length) {
        return sendMobileNotif(data);
      }

      _.each(socketIds, (socketId) => {
        sendSocketNotif(socketId, data);
      });

      return Promise.resolve();
    });
}

function sendMobileNotif(data) {
  return apnHelper.emit(data.pushToken, data);
}

function sendSocketNotif(socketId, data) {
  data.socketId = socketId;
  pubsubHelper.publish(constants.pubsub.channels.distributor, JSON.stringify(data));
}
