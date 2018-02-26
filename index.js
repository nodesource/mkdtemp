'use strict'

const util = require('util');
const fs = require('fs');

//
// Helpers
// from https://github.com/nodejs/node/blob/master/lib/fs.js
//

function rethrow() {
  if (process.emitWarning) {
    process.emitWarning(
      'Calling an asynchronous function without callback is deprecated.',
      'DeprecationWarning', 'DEP0013', rethrow
    );
  }

  return function(err) {
    if (err) {
      throw err;
    }
  };
}

function makeCallback(cb) {
  if (cb === undefined) {
    return rethrow();
  }

  if (typeof cb !== 'function') {
    throw new TypeError('ERR_INVALID_CALLBACK');
  }

  return function() {
    const args = [];
    for (let i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    return cb.apply(undefined, args);
  };
}

//
// Helpers
// from https://github.com/nodejs/node/blob/master/lib/internal/fs.js
//

function getOptions(options, defaultOptions) {
  if (options === null || options === undefined ||
      typeof options === 'function') {
    return defaultOptions;
  }

  if (typeof options === 'string') {
    defaultOptions = util._extend({}, defaultOptions);
    defaultOptions.encoding = options;
    options = defaultOptions;
  } else if (typeof options !== 'object') {
    throw new TypeError('ERR_INVALID_ARG_TYPE');
  }

  if (options.encoding !== 'buffer')
    assertEncoding(options.encoding);
  return options;
}

function assertEncoding(encoding) {
  if (encoding && !Buffer.isEncoding(encoding)) {
    throw new TypeError('ERR_INVALID_OPT_VALUE_ENCODING');
  }
}

function nullCheck(path, propName, throwError) {
  if (typeof throwError === 'undefined') throwError = true
  const pathIsString = typeof path === 'string';
  const pathIsUint8Array = isUint8Array(path);

  if (!pathIsString && !pathIsUint8Array) {
    return;
  }

  if (pathIsString && path.indexOf('\u0000') === -1) {
    return;
  } else if (pathIsUint8Array && path.indexOf(0) === -1) {
    return;
  }

  const err = new Error('ERR_INVALID_ARG_VALUE');

  if (throwError) {
    Error.captureStackTrace(err, nullCheck);
    throw err;
  }
  return err;
}

//
// Helpers
// from https://github.com/nodejs/node/blob/master/lib/internal/util/types.js
//

function isUint8Array(value) {
  return value.constructor === Uint8Array;
}

//
// mkdtemp(prefix[, options], callback)
//

module.exports = function(prefix, options, callback) {
  callback = makeCallback(typeof options === 'function' ? options : callback);
  options = getOptions(options, {});
  if (!prefix || typeof prefix !== 'string') {
    throw new TypeError('ERR_INVALID_ARG_TYPE');
  }
  nullCheck(prefix, 'prefix');
  const dirName = prefix + Math.random().toString(16).slice(2, 8);
  fs.mkdir(dirName, function(err) {
    if(err) return callback(err);
    callback(null, dirName);
  });
};

//
// mkdtempSync(prefix[, options])
//

module.exports.sync = function(prefix, options) {
  options = getOptions(options, {});
  if (!prefix || typeof prefix !== 'string') {
    throw new TypeError('ERR_INVALID_ARG_TYPE');
  }
  nullCheck(prefix, 'prefix');
  const dirName = prefix + Math.random().toString(16).slice(2, 8);
  fs.mkdirSync(dirName);
  return dirName;
};