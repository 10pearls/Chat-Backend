'use strict';

const helpers = require('../helpers');
const templates = require('../templates');
const sharedRepos = require('../../lib/repositories');
const sharedHelpers = require('../../lib/helpers');

module.exports = {
  notify
};

const subjectTemplate = templates.chatInvitation.subject;
const bodyTemplate = templates.chatInvitation.body;
const webMessageTemplate = templates.chatInvitation.webMessage;
const mobileMessageTemplate = templates.chatInvitation.mobileMessage;

function notify(senderId, recipientIds, data) {
  return Promise.all([
    _sendEmail(recipientIds, data),
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
