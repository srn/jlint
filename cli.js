#!/usr/bin/env node
'use strict';

var pkg = require('./package.json');
var jlint = require('./');
var argv = process.argv.slice(2);

var symbols = require("log-symbols");
var cardinal = require('cardinal');

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

function outputJson (lint) {
  if (argv.indexOf('--silent') === -1) {
    if (lint.parsed) {
      console.log(cardinal.highlight(lint.content, {json: true}));
    } else {
      console.log(lint.content);
    }
  }

  process.exit(0);
}

jlint(function (lint) {
  outputJson(lint);

  if (lint.parsed) {
    console.log(symbols.success);
  } else {
    console.log(symbols.error, lint.exception);
  }
});
