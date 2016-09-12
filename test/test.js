'use strict';

require('mocha');
var assert = require('assert');
var generate = require('generate');
var defaults = require('..');
var app;

describe('generate-defaults', function() {
  beforeEach(function() {
    app = generate();
    app.use(defaults);
  });

  describe('plugin', function() {
    describe('engine', function() {
      it('should add an engine to the instance', function(cb) {
        assert(app.engines['.*']);
        assert.equal(typeof app.engines['.*'], 'object');
        assert.equal(typeof app.engines['.*'].render, 'function');
        cb();
      });
    });
  });
});
