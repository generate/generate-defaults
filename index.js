'use strict';

var os = require('os');
var fs = require('fs');
var path = require('path');
var utils = require('./utils');

module.exports = function plugin(app, base) {
  if (!utils.isValid(app, 'generate-defaults')) return;

  /**
   * Plugins
   */

  app.use(utils.pkg());
  app.use(utils.middleware());
  app.use(utils.questions());
  app.use(require('verb-repo-data'));

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

  /**
   * Data
   */

  var projectData = utils.merge({}, app.pkg.data, app.get('cache.data.project'));
  app.data({project: projectData});
  return plugin;
};
