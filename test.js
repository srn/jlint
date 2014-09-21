'use strict';

var assert = require('assert');
var copypaste = require("copy-paste");

var jlint = require('./');

var fixtures = {
  parses: '{"hello": 1, "foo": "bar"}',
  fails: '{"hello": 1, "foo": "bar"}"'
};

describe('jlint', function(){

  describe('parses', function () {
    before(function (done) {
      copypaste.copy(fixtures.parses, function (copy) {
        done();
      });
    });

    it('should parse', function(done){
      jlint(function (lint) {
        assert.equal(lint.parsed, true);
        assert.equal(lint.content, JSON.stringify(JSON.parse(fixtures.parses), null, 2));
        assert.equal(lint.exception, void 0);

        done();
      });
    });
  });

  describe('fails', function () {
    before(function (done) {
      copypaste.copy(fixtures.fails, function (copy) {
        done();
      });
    });

    it('should not parse', function(done){
      jlint(function (lint) {
        assert.equal(lint.parsed, false);
        assert.equal(lint.content, fixtures.fails);
        assert.notEqual(lint.exception, void 0);

        done();
      });
    });
  });
});
