'use strict';

const config = require('./config');
const APN = require('apn');
const path = require('path');

let instance;

module.exports = init;

function init() {
  if (instance) {
    return instance;
  }

  return new Promise((resolve) => {
    let env = config.get('env');
    let certsDir = `./certificates/${env}/`;

    let options = {
      cert: path.join(__dirname, `${certsDir}/cert.pem`),
      key: path.join(__dirname, `${certsDir}/key.unencrypted.pem`),
      production: !config.get('apn.sandbox')
    };

    instance = new APN.Connection(options);

    return resolve(instance);
  });
}
