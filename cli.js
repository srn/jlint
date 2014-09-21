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

jlint(function (lint) {
  if (lint.parsed) {
    console.log(symbols.success);
    console.log(lint.content);
  } else {
    console.log(symbols.error, lint.exception);
    console.log(lint.content);
  }
});
