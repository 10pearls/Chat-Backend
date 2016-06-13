'use strict';

const SocketIO = require('socket.io');

let instance;

module.exports = init;

function init(listener) {
  if (!listener) {
    return instance;
  }

  return new Promise((resolve) => {
    if (instance) {
      return resolve(instance);
    }

    instance = SocketIO.listen(listener);
    setTimeout(() => { return resolve(instance); }, 300);
  });
}
