"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.camelize = camelize;
exports.camelizeKeys = camelizeKeys;
exports.decamelizeKeys = decamelizeKeys;

var _humps = require("humps");

function camelize(str) {
  if (/-/.test(str)) {
    return str;
  }

  return (0, _humps.camelize)(str);
}

function camelizeKeys(payload) {
  return (0, _humps.camelizeKeys)(payload, function (key, convert, options) {
    if (/-/.test(key)) {
      return key;
    }

    return convert(key, options);
  });
}

function decamelizeKeys(payload) {
  return (0, _humps.decamelizeKeys)(payload, function (key, convert, options) {
    if (key === 'require2fa') {
      return 'require_2fa';
    }

    if (/-/.test(key)) {
      return key;
    }

    return convert(key, options);
  });
}