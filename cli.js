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
      -g, --glob     Files to match using glob pattern

    Examples
      $ jlint --silent
      ✔

      $ jlint --glob './*.js'
      ✖ ./cli.js
      Unexpected token '#' at 1:1
      #!/usr/bin/env node
      ^

      $ node cli.js package.json test.js --silent
      ✔ package.json
      ✖ test.js

      $ cat package.json | jlint --silent
      ✔
`, {
  alias: {
    s: 'silent',
    g: 'glob'
  }
});

updateNotifier({pkg: cli.pkg}).notify();

var opts = Object.assign({}, {
  pattern: cli.flags.glob,
  files: cli.input
});

jlint(opts, (error, json, file) => {
  file = file || '';

  if (error) {
    console.log(symbols.error, file);

    if (!cli.flags.silent) {
      console.log(error.message);
    }

    return;
  }

  if (!cli.flags.silent) {
    console.log(cardinal.highlight(JSON.stringify(json, null, 2), {json: true}));
  }

  console.log(symbols.success, file);
});
