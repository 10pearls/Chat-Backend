'use strict';

const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

let data = {
  signup: {
    subject: 'Welcome to TurtleWise!',
    body: load('./signup.html')
  },
  emailVerification: {
    subject: 'Email Verification',
    body: load('./emailVerification.html')
  },
  questionReceived: {
    subject: 'A TurtleWise Explorer needs your help! (<%- content.substr(0,21) %>...)',
    body: load('./questionReceived.html'),
    webMessage: 'A TurtleWise Explorer needs your help!',
    mobileMessage: 'A TurtleWise Explorer needs your help! (<%- content.substr(0,21) %>...)'
  },
  answerReceived: {
    subject: 'Help is On the Way! (<%- content.substr(0,21) %>...)',
    body: load('./answerReceived.html'),
    webMessage: 'Help is On the Way!',
    mobileMessage: 'Help is On the Way! (<%- content.substr(0,21) %>...)'
  },
  chatInvitation: {
    subject: 'You have been invited for a chat! (<%= content.substr(0,21) %>...)',
    body: load('./chatInvitation.html'),
    webMessage: 'You have been invited for a chat!',
    mobileMessage: 'You have been invited for a chat! (<%- content.substr(0,21) %>...)'
  },
  chatMessageReceived: {
    webMessage: 'You have received a new message.',
    mobileMessage: 'You have received a new message.'
  },
  chatEnded: {
    subject: 'Chat Ended! (<%= content.substr(0,21) %>...)',
    body: load('./chatEnded.html'),
    webMessage: 'Your chat session has come to an end!',
    mobileMessage: 'Your chat session has come to an end! (<%- content.substr(0,21) %>...)'
  },
  dailyDigest: {
    subject: 'Daily Email Digest',
    body: load('./dailyDigest.html')
  },
  endSubscription: {
    subject: 'Monthly Subscription Ended',
    body: load('./endSubscription.html'),
    webMessage: 'Your Monthly Subscription has been ended!',
    mobileMessage: 'Your Monthly Subscription has come to an end!'
  }
};

module.exports = compileEJS(data);

function load(relPath) {
  return fs.readFileSync(path.join(__dirname, relPath), 'utf8');
}

function compileEJS(object) {
  _.each(_.keys(object), (rootKey) => {
    _.each(_.keys(object[rootKey]), (tplKey) => {
      object[rootKey][tplKey] = ejs.compile(object[rootKey][tplKey]);
    });
  });

  return object;
}
