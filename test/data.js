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

  describe('data', function() {
    it('should add package.json properties to `cache.data` on a generator', function() {
      app.use(defaults);
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

  describe('license', function() {
    it('should set project.license', function(cb) {
      app.data('project.license', 'MIT');
      render(app, function(err) {
        if (err) return cb(err);
        assert.equal(app.cache.data.license, 'MIT');
        cb();
      });
    });

    it('should set license', function(cb) {
      app.data('project.license', 'MIT');
      render(app, function(err) {
        if (err) return cb(err);
        assert.equal(app.cache.data.license, 'MIT');
        cb();
      });
    });

    it('should get license', function(cb) {
      render(app, function(err) {
        if (err) return cb(err);
        assert.equal(app.cache.data.license, 'MIT');
        cb();
      });
    });
  });
});

function render(app, cb) {
  if (!app.tests) {
    app.engine('*', require('engine-base'));
    app.create('tests');
    app.test('foo.md', {content: 'this is foo'});
  }
  app.toStream('tests')
    .pipe(app.renderFile('*'))
    .on('error', cb)
    .pipe(app.dest('test/actual'))
    .on('error', cb)
    .on('end', cb);
}
