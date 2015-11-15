'use strict';

const fs = require('fs');
const glob = require('glob');
const parseJson = require('parse-json');
const copypaste = require('copy-paste');

let parse = (content, cb) => {
  try {
    let json = parseJson(content);

    cb(null, json);
  } catch (e) {
    cb(e);
  }
};

let promise = new Promise((resolve, reject) => {
  if (process.stdin && !process.stdin.isTTY) {
    var data = '';

    process.stdin.on('data', (chunk) => {
      chunk = chunk.toString();

      if (chunk !== null) {
        data += chunk;
      }
    });

    process.stdin.on('error', (err) => reject(err));
    process.stdin.on('end', () => resolve(data));
  }
});

let parseFile = (f, cb) => {
  fs.readFile(f, {encoding: 'utf8'}, (err, content) => {
    if (err) {
      return cb(err);
    }

    parse(content, (er, json) => cb(er, json, f));
  });
};

module.exports = (opts, callback) => {
  if (opts.pattern) {
    glob(opts.pattern, (error, files) => {
      if (error) {
        return callback(error);
      }

      if (files.length === 0) {
        return callback(new Error(`Could not find any files based on ${opts.pattern}`));
      }

      files.forEach((f) => parseFile(f, callback));
    });

    return;
  }

  if (opts.files && opts.files.length > 0) {
    opts.files.forEach((f) => parseFile(f, callback));

    return;
  }

  if (process.stdin && !process.stdin.isTTY) {
    promise.then((content) => parse(content, callback)).catch(err => callback(err));

    return;
  }

  copypaste.paste((err, content) => {
    if (err) {
      throw err;
    }

    parse(content, callback);
  });
};
