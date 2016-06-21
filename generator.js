'use strict';

var os = require('os');
var fs = require('fs');
var path = require('path');
var utils = require('./utils');

/**
 * Exposes the generator on the `invoke` property, allowing you to load
 * the default settings where it makes sense.
 *
 * ```js
 * var defaults = require('generate-defaults');
 *
 * // in your generator
 * app.use(defaults());
 * ```
 * @api public
 */

module.exports = function plugin(app, base) {
  if (!utils.isValid(app, 'generate-defaults')) return;
  app.define('home', path.resolve.bind(path, os.homedir()));

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
   * Data
   */

  var projectData = utils.merge({}, app.pkg.data, app.get('cache.data.project'));
  app.data({project: projectData});
  return plugin;
};
