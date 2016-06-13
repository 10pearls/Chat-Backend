'use strict';

const helpers = require('../helpers');
const templates = require('../templates');
const sharedRepos = require('../../lib/repositories');
const sharedHelpers = require('../../lib/helpers');

module.exports = {
  notify
};

const subjectTemplate = templates.chatEnded.subject;
const bodyTemplate = templates.chatEnded.body;
const webMessageTemplate = templates.chatEnded.webMessage;
const mobileMessageTemplate = templates.chatEnded.mobileMessage;

function notify(senderId, recipientIds, data) {
  // Email will be sent to seeker only
  // Other notification will be sent to all

  return Promise.all([
    _sendEmail([senderId], data),
    helpers.notification.send(recipientIds, data, {web: webMessageTemplate, mobile: mobileMessageTemplate})
  ]);
}

function _sendEmail(recipientIds, data) {
  return sharedRepos.user.findEmailByIds(recipientIds, true)
    .then((users) => {
      let emailExecutions = [];

      for (let user of users) {
        let email = sharedHelpers.profile.getEmail(user);
        let subject = subjectTemplate(data);
        let body = bodyTemplate(data);

        emailExecutions.push(sharedHelpers.email.send(email, subject, body));
      }

      return Promise.all(emailExecutions);
    });
}
