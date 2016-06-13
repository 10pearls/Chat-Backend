'use strict';

const convict = require('convict');
const path = require('path');

let conf = convict({
  env: {
    doc: 'Application environment',
    format: ['dev', 'test', 'qa', 'staging', 'prod'],
    default: 'dev',
    env: 'NODE_ENV'
  },
  appURL: {
    doc: 'Frontend URL',
    format: '*',
    default: 'https://app.turtlewise.net'
  },

  emailService: {
    doc: 'Email Service',
    format: ['nodemailer', 'ses'],
    default: 'nodemailer'
  },
  loggly: {
    token: {
      doc: 'Loggly Token',
      format: '*',
      default: ''
    },
    subdomain: {
      doc: 'Loggly Subdomain',
      format: '*',
      default: 'turtlewise'
    }
  },
  mongodb: {
    hosts: [{
      doc: 'Host for mongodb',
      format: '*',
      default: 'mongodb://localhost'
    }],
    replicaSet: {
      name: {
        doc: 'Replica set name',
        format: '*',
        default: ''
      },
      readPreference: {
        doc: 'Replica set read preference',
        format: '*',
        default: ''
      }
    },
    name: {
      doc: 'DB name',
      format: '*',
      default: 'twise'
    },
    username: {
      doc: 'Username for mongodb',
      format: '*',
      default: ''
    },
    password: {
      doc: 'Password for mongodb',
      format: '*',
      default: ''
    },
    port: {
      doc: 'Port for mongodb',
      format: 'port',
      default: 27017
    },
    migrations: {
      directory: {
        doc: 'Migrations directory',
        format: '*',
        default: 'migrations'
      },
      collection: {
        doc: 'Collection to keep migration history',
        format: '*',
        default: 'history'
      }
    },
    poolSize: {
      doc: 'Connection pool size',
      format: 'nat',
      default: 5
    }
  },
  redis: {
    host: {
      doc: 'Redis host',
      format: '*',
      default: 'localhost'
    },
    port: {
      doc: 'Redis port',
      format: 'port',
      default: 6379
    },
    password: {
      doc: 'Redis password',
      format: '*',
      default: '10Pearls'
    }
  },
  smtp: {
    host: {
      doc: 'SMTP Outgoing Host',
      format: '*',
      default: ''
    },
    port: {
      doc: 'SMTP Outgoing Port',
      format: 'int',
      default: 465
    },
    secure: {
      doc: 'Use SSL',
      format: Boolean,
      default: true
    },
    email: {
      doc: 'E-mail',
      format: '*',
      default: ''
    },
    username: {
      doc: 'Username (usually E-mail)',
      format: '*',
      default: ''
    },
    password: {
      doc: 'Password',
      format: '*',
      default: ''
    }
  },
  jwt: {
    secret: {
      doc: 'JWT token secret key',
      format: '*',
      default: 'SomeRandomHardToGuessSecretKey'
    },
    auth: {
      expiresIn: {
        doc: 'JWT token duration in seconds (Authentication)',
        format: 'int',
        default: 3600
      }
    },
    email: {
      expiresIn: {
        doc: 'JWT token duration in seconds (Email verification)',
        format: 'int',
        default: 1800
      }
    }
  },
  jets: {
    appToken: 'EnCt28bb60d315d74e16bf2aac4aaad94c1863c56e2e08bb60d315d74e16bf2aac4aaVdzj3WwnWANr'
  }
});

var env = conf.get('env');
conf.loadFile(path.join(__dirname, `./env/${env}.json`));

// Perform validation
conf.validate({strict: true});

module.exports = conf;
