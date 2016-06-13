'use strict';

const config = require('../../lib/config');
const helpers = require('../../lib/helpers');
const enums = require('../../lib/enums');
const _ = require('lodash');

const Redis = require('ioredis');
let redis = new Redis(config.get('redis'));

module.exports = {
  save,
  remove,
  findSocketsByUserId,
  findUserBySocketId
};

function save(socketId, userToken) {
  return helpers.token.validate(userToken)
    .then((claims) => {
      let userId = claims.userId;
      let deviceType = claims.deviceType;

      redis.hset('sockets', socketId, JSON.stringify(claims));
      redis.sadd(`users:${deviceType}:${userId}`, socketId);

      return Promise.resolve(claims);
    });
}

function remove(socketId) {
  return findUserBySocketId(socketId)
    .then((user) => {
      let userId = user.userId;
      let deviceType = user.deviceType;

      return Promise.all([
        redis.hdel('sockets', socketId),
        redis.srem(`users:${deviceType}:${userId}`, socketId)
      ]);
    });
}

function findSocketsByUserId(userId, deviceType) {
  if (deviceType) {
    return redis.smembers(`users:${deviceType}:${userId}`);
  }

  return Promise.all([
    redis.smembers(`users:${enums.user.deviceType.web}:${userId}`),
    redis.smembers(`users:${enums.user.deviceType.ios}:${userId}`)
  ])
    .then((socks) => {
      return Promise.resolve(_.flattenDeep(socks));
    });
}

function findUserBySocketId(socketId) {
  return redis.hget('sockets', socketId)
    .then((user) => {
      if (!user) {
        throw new Error('User not found');
      }

      user = JSON.parse(user);
      return Promise.resolve(user);
    });
}
