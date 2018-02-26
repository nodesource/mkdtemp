'use strict'

const mkdtemp = require('.');
const mkdtempSync = require('.').sync;
const test = require('tap').test;
const path = require('path');
const tmpdir = require('os').tmpdir;
const fs = require('fs');

test('https://github.com/nodejs/node/blob/0b1285c76fb2ba7927674d3d762938ce8747eebb/test/parallel/test-fs-mkdtemp-prefix-check.js', function(t) {
  const prefixValues = [undefined, null, 0, true, false, 1, ''];

  function fail(value) {
    t.throws(function (){
      mkdtempSync(value, {});
    }, {
      message: 'ERR_INVALID_ARG_TYPE',
      name: 'TypeError'
    });
  }

  function failAsync(value) {
    try {
      mkdtemp(value, function () {
        t.fail();
      });
    } catch (err) {
      t.equal(err.message, 'ERR_INVALID_ARG_TYPE');
      t.equal(err.name, 'TypeError')
    }
  }

  prefixValues.forEach((prefixValue) => {
    fail(prefixValue);
    failAsync(prefixValue);
  });

  t.end();
});

test('https://github.com/nodejs/node/blob/15bb8437fd0a0eb07845ccf746c9ecb47fcfcb25/test/parallel/test-fs-mkdtemp.js', function(t) {
  const tmpFolder = mkdtempSync(path.join(tmpdir(), 'foo.'));

  t.equal(path.basename(tmpFolder).length, 'foo.XXXXXX'.length);
  fs.statSync(tmpFolder);

  const utf8 = mkdtempSync(path.join(tmpdir(), '\u0222abc.'));
  t.equal(Buffer.byteLength(path.basename(utf8)),
                     Buffer.byteLength('\u0222abc.XXXXXX'));
  fs.statSync(utf8);

  function handler(err, folder) {
    t.error(err);
    fs.statSync(folder);
    t.equal(this, undefined);
  }

  mkdtemp(path.join(tmpdir(), 'bar.'), function(err, folder) {
    t.error(err);
    fs.statSync(folder);
    t.equal(this, undefined);

    // Same test as above, but making sure that passing an options object doesn't
    // affect the way the callback function is handled.
    mkdtemp(path.join(tmpdir(), 'bar.'), {}, function(err, folder) {
      t.error(err);
      fs.statSync(folder);
      t.equal(this, undefined);

      // Making sure that not passing a callback doesn't crash, as a default function
      // is passed internally.
      mkdtemp(path.join(tmpdir(), 'bar-'));
      mkdtemp(path.join(tmpdir(), 'bar-'), {});

      t.end();
    });
  });
});