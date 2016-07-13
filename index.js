'use strict';

var utils = require('./utils');

module.exports = function plugin(app) {
  if (!utils.isValid(app, 'generate-defaults')) return;
  var project;

  /**
   * Plugins
   */

  app.use(require('verb-repo-data'));
  app.use(utils.middleware());
  app.use(utils.questions());

  /**
   * Merge package.json object onto the `project` property on the context
   */

  Object.defineProperty(app.cache.data, 'project', {
    set: function(val) {
      project = val;
    },
    get: function() {
      return project || (project = utils.extend({}, app.pkg.data));
    }
  });

  /**
   * Engine
   */

  if (!app.getEngine('*')) {
    app.engine('*', require('engine-base'), app.option('engineOpts'));
  }

  /**
   * Helpers
   */

  app.helpers(require('template-helpers')());
  return plugin;
};
