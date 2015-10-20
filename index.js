'use strict';

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

    process.stdin.on('error', (err) => {
      reject(err);
    });

    process.stdin.on('end', () => {
      resolve(data);
    });
  }
});

module.exports = (callback) => {
  if (process.stdin && !process.stdin.isTTY) {
    promise.then((content) => parse(content, callback)).catch(err => callback(err));
  } else {
    copypaste.paste((err, content) => {
      if (err) {
        throw err;
      }

      parse(content, callback);
    });
  }
};
