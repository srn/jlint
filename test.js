'use strict';

var assert = require('assert');
var copypaste = require('copy-paste');

var jlint = require('./');

var fixtures = {
  parses: '{"hello": 1, "foo": "bar"}',
  fails: '{"hello": 1, "foo": "bar"}"'
};

describe('jlint', () => {

  describe('copy-paste', () => {
    it('should parse', (done) => {
      copypaste.copy(fixtures.parses, () => {
        jlint({}, (error, json) => {
          assert.equal(error, null);
          assert.deepEqual(json, JSON.parse(fixtures.parses));

          done();
        });
      });
    });

    it('should not parse', (done) => {
      copypaste.copy(fixtures.fails, () => {
        jlint({}, err => {
          assert(err instanceof Error);

          done();
        });
      });
    });
  });

  describe('stdin', () => {
    it('should parse', (done) => {
      delete require.cache[require.resolve('./')];

      var stdin = require('mock-stdin').stdin();
      var jlint = require('./');

      process.stdin.resume();

      stdin.send(fixtures.parses);
      stdin.end();

      jlint({}, (error, json) => {
        assert.equal(error, null);
        assert.deepEqual(json, JSON.parse(fixtures.parses));

        stdin.restore();

        done();
      });
    });

    it('should not parse', (done) => {
      delete require.cache[require.resolve('./')];

      var stdin = require('mock-stdin').stdin();
      var jlint = require('./');

      process.stdin.resume();

      stdin.send(fixtures.fails);
      stdin.end();

      jlint({}, (err) => {
        assert(err instanceof Error);

        stdin.restore();

        done();
      });
    });
  });

});
