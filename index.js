'use strict';

var middleware = require('common-middleware');
var engine = require('engine-base');
var date = require('helper-date');

module.exports = function(app) {
  app.task('defaults', { silent: true }, function(cb) {
    var opts = app.option('engine') || {};

    // engine/helpers
    app.engine('*', engine, opts);
    app.helper('date', date);

    // middleware
    app.use(middleware());

    // use an empty layout to unsure that all pre-and
    // post-layout middleware are still triggered
    app.preLayout(/\.md/, function(view, next) {
      if (!view.layout) view.layout = 'empty';
      next();
    });

    // data
    app.data({cwd: app.cwd || process.cwd()});
    app.data({year: new Date().getFullYear()});
    app.data(app.pkg.data || {});

    // template collections
    app.create('docs', {engine: '*'});
    app.create('includes', {viewType: 'partial', engine: '*'});
    app.create('layouts', {viewType: 'layout', engine: '*'});

    // "noop" layout
    app.layout('empty', {content: '{% body %}'});
    cb();
  });

  app.task('default', ['defaults']);
};
