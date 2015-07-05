'use strict';

var copypaste = require("copy-paste");
var Promise = require('es6-promise').Promise;

var lint = {
  parsed: void 0,
  content: void 0,
  exception: void 0
};

var parse = function (content) {
  try {
    lint.parsed = true;
    lint.content = JSON.stringify(JSON.parse(content), null, 2);
  } catch(ex) {
    lint.content = content;
    lint.parsed = false;
    lint.exception = ex;
  }

  return lint;
};

var promise;

if (process.stdin && !process.stdin.isTTY) {
  promise = new Promise(function (resolve) {
    var stdinData = '';

    process.stdin.on('data', function(data) {
      var chunk = data.toString();

      if (chunk !== null) {
        stdinData += chunk;
      }
    });

    process.stdin.on('end', function () {
      resolve(stdinData);
    });
  })
}

module.exports = function(callback){
  if (process.stdin && !process.stdin.isTTY) {
    promise.then(function (stdinData) {
      callback(parse(stdinData));
    });

    return;
  }

  copypaste.paste(function (err, content) {
    if (err) {
      console.log(err);

      lint.parsed = false;
      callback(lint);
    }

    var parsed = parse(content);

    callback(lint, parsed);
  });
};
