'use strict';

var assert = require('assert');
var copypaste = require("copy-paste");

var jlint = require('./');

var fixtures = {
  parses: '{"hello": 1, "foo": "bar"}',
  fails: '{"hello": 1, "foo": "bar"}"'
};

describe('jlint', function(){

  describe('copy-paste', function () {
    it('should parse', function(done){
      copypaste.copy(fixtures.parses, function () {
        jlint(function (lint) {
          assert.equal(lint.parsed, true);
          assert.equal(lint.content, JSON.stringify(JSON.parse(fixtures.parses), null, 2));
          assert.equal(lint.exception, void 0);

          done();
        });
      });
    });

    it('should not parse', function(done){
      copypaste.copy(fixtures.fails, function () {
        jlint(function (lint) {
          assert.equal(lint.parsed, false);
          assert.equal(lint.content, fixtures.fails);
          assert.notEqual(lint.exception, void 0);

          done();
        });
      });
    });
  });

  describe('stdin', function () {
    it('should parse', function(done){
      delete require.cache[require.resolve('./')];

      var stdin = require('mock-stdin').stdin();

      var jlint = require('./');

      process.stdin.resume();
      stdin.send(fixtures.parses);
      stdin.end();

      jlint(function (lint) {
        assert.equal(lint.parsed, true);
        assert.equal(lint.content, JSON.stringify(JSON.parse(fixtures.parses), null, 2));
        assert.equal(lint.exception, void 0);

        stdin.restore();

        done();
      });


    });
  });

});
