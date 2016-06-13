'use strict';

const config = require('../../lib/config');
const restify = require('restify');
const validationMessages = require('../../lib/constants/validation');

module.exports = {
  isAuthenticated
};

function isAuthenticated(req, res, next) {
  let token = req.headers.token;
  if (!token) {
    _unauthorized(validationMessages.appToken.empty);
  }

  if (token !== config.get('jets.appToken')) {
    _unauthorized(validationMessages.appToken.invalid);
  }

  return next();
}

function _unauthorized(reason) {
  throw new restify.UnauthorizedError(reason);
}
