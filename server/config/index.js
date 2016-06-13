'use strict';

const convict = require('convict');
const path = require('path');

function getLocalIP() {
  var _ip = '127.0.0.1';
  var Os = require('os');
  var _ifaces = Os.networkInterfaces();

  for (var dev in _ifaces) {
    var alias = 0;
    _ifaces[dev].forEach(function(details) {
      if (details.family === 'IPv4') {
        if (dev === 'eth0') {
          _ip = details.address;
        }
        ++alias;
      }
    });
  }
  return _ip;
}

let conf = convict({
  env: {
    doc: 'Application environment',
    format: ['dev', 'test', 'qa', 'staging', 'prod'],
    default: 'dev',
    env: 'NODE_ENV'
  },
  ip: {
    doc: 'Local IP',
    format: '*',
    default: getLocalIP()
  },
  port: {
    doc: 'Port to bind',
    format: 'port',
    default: 9000,
    env: 'NODE_PORT'
  },
  logs: {
    dir: {
      docs: 'Logs directory',
      format: '*',
      default: path.join(__dirname, '../logs')
    }
  },
  apn: {
    sandbox: {
      doc: 'Use sandbox server?',
      format: Boolean,
      default: true
    },
    note: {
      expiry: {
        value: 24,
        unit: 'hours'
      },
      sound: 'ping.aiff'
    }
  }
});

var env = conf.get('env');
conf.loadFile(path.join(__dirname, `./env/${env}.json`));

// Perform validation
conf.validate({strict: true});

module.exports = conf;
