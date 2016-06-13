'use strict';

const sharedConfig = require('../../lib/config');
const constants = require('../constants');
const config = require('../config');
const repos = require('../repositories');
const SocketIO = require('../socket')();
const apnHelper = require('./apn');

const Redis = require('ioredis');
const pub = new Redis(sharedConfig.get('redis'));
const sub = new Redis(sharedConfig.get('redis'));

module.exports = {
  publish,
  subscribe
};

function publish(channel, data) {
  return pub.publish(channel, data);
}

function subscribe(channel) {
  return sub.subscribe(channel);
}

subscribe(constants.pubsub.channels.distributor);
subscribe(constants.pubsub.channels.emitPushNotif);
sub.on('message', onMessage);

function onMessage(channel, data) {
  data = JSON.parse(data);
  let socketId = data.socketId.split(':');

  let ip = socketId[0];
  let port = socketId[1];
  socketId = socketId[2];

  if (ip + port !== config.get('ip') + config.get('port')) {
    return;
  }

  if (channel === constants.pubsub.channels.emitPushNotif) {
    return apnHelper.emit(data);
  }

  if (channel === constants.pubsub.channels.distributor) {
    let socket = SocketIO.sockets.connected[`/#${socketId}`];

    if (!socket) {
      pub.publish(constants.pubsub.channels.emitPushNotif, JSON.stringify(data));
      // clean up the cache
      return repos.user.remove(data.socketId, {
        userId: data.userId,
        deviceType: data.deviceType
      });
    }

    socket.emit(data.event, data);
  }
}
