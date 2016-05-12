'use strict';

require('mocha');
var assert = require('assert');
var generate = require('generate');
var defaults = require('./');
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

  describe('generator', function() {
    it('should add package.json properties to `cache.data` on a generator', function() {
      app.use(defaults);
      assert(app.cache.data.hasOwnProperty('runner'));
      assert(app.cache.data.hasOwnProperty('name'));
      assert(app.cache.data.hasOwnProperty('version'));
    });

    it('should add package.json properties to `cache.data.project` on a generator', function() {
      app.use(defaults);
      assert(app.cache.data.project.hasOwnProperty('name'));
      assert(app.cache.data.project.hasOwnProperty('version'));
    });

    it('should add data properties to `cache.data` on a sub-generator', function(cb) {
      app.use(defaults);
      var count = 0;

      app.generator('foo', function(foo) {
        assert(foo.cache.data.hasOwnProperty('runner'));
        assert(foo.cache.data.hasOwnProperty('name'));
        assert(foo.cache.data.hasOwnProperty('version'));
        count++;
      });

      assert.equal(count, 1);
      cb();
    });

    it('should add "project" properties to `cache.data.project` on a sub-generator', function(cb) {
      app.use(defaults);
      var count = 0;

      app.generator('foo', function(foo) {
        assert(foo.cache.data.project.hasOwnProperty('name'));
        assert(foo.cache.data.project.hasOwnProperty('version'));
        count++;
      });

      assert.equal(count, 1);
      cb();
    });
  });
});
