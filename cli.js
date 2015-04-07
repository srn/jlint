#!/usr/bin/env node
'use strict';

var pkg = require('./package.json');
var jlint = require('./');
var argv = process.argv.slice(2);

var symbols = require("log-symbols");

function help() {
  console.log([
    '',
      '  ' + pkg.description,
    '',
    '  Example',
    '    jlint',
    '',
    '    ✔'
  ].join('\n'));
}

if (argv.indexOf('--help') !== -1) {
  help();
  return;
}

if (argv.indexOf('--version') !== -1) {
  console.log(pkg.version);
  return;
}

function outputJson (content) {
  if (argv.indexOf('--silent') === -1) {
    console.log(content);
  }
}

jlint(function (lint) {
  if (lint.parsed) {
    outputJson(lint.content);
    console.log(symbols.success);
  } else {
    outputJson(lint.content);
    console.log(symbols.error, lint.exception);
  }
});
