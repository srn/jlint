#!/usr/bin/env node
'use strict';

const jlint = require('./');
const meow = require('meow');
const updateNotifier = require('update-notifier');
const symbols = require('log-symbols');
const cardinal = require('cardinal');

const cli = meow(`
    Usage
      $ jlint

    Options
      -s, --silent   Don't output json, just parse

    Examples
      $ jlint --silent
      ✔
`, {
  alias: {
    s: 'silent'
  }
});

updateNotifier({pkg: cli.pkg}).notify();

jlint((error, json) => {
  if (error) {
    console.log(error.message);
    console.log(symbols.error);

    return;
  }

  if (!cli.flags.silent) {
    console.log(cardinal.highlight(JSON.stringify(json, null, 2), {json: true}));
  }

  console.log(symbols.success);
});
