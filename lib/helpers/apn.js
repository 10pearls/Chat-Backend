'use strict';

const APN = require('apn');
const apn = require('../apn')();
const config = require('../config');
const moment = require('moment');
const _ = require('lodash');

module.exports = {
  emit
};

function emit(pushToken, data) {
  if (!pushToken) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    data = _.cloneDeep(data);

    let device = new APN.Device(pushToken);

    let noteExpiry = config.get('apn.note.expiry');

    let note = new APN.Notification();
    note.expiry = moment().add(noteExpiry.value, noteExpiry.unit).unix();
    note.sound = config.get('apn.note.sound');
    note.alert = data.message;
    note.payload = data;

    data.silent = !data.message;

    if (data.silent) {
      note.sound = '';
      note.alert = '';
      note['content-available'] = '1';
    }

    apn.pushNotification(note, device);

    return resolve();
  });
}
