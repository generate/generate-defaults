'use strict';

require('mocha');
var assert = require('assert');
var generate = require('generate');
var defaults = require('./');
var app;

describe('generate-defaults', function() {
  beforeEach(function() {
    app = generate();
  });

  describe('task', function() {
    it('should work as a task', function(cb) {
      app.task('foo', defaults.task(app));
      app.build('foo', function(err) {
        if (err) return cb(err);
        cb();
      });
    });
  });

  describe('load', function() {
    describe('collections', function() {
      it('should add collections to the instance', function(cb) {
        defaults.invoke(app);

        assert.equal(typeof app.docs, 'function');
        assert.equal(typeof app.includes, 'function');
        assert.equal(typeof app.layouts, 'function');
        cb();
      });
    });

    describe('engine', function() {
      it('should add an engine to the instance', function(cb) {
        defaults.invoke(app);

        assert(app.engines['.*']);
        assert.equal(typeof app.engines['.*'], 'object');
        assert.equal(typeof app.engines['.*'].render, 'function');
        cb();
      });
    });
  });

  describe('generator', function() {
    it('', function(cb) {
      cb();
    });
  });

  describe('function', function() {
    it('', function(cb) {

      cb();
    });
  });
});
