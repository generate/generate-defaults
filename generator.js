'use strict';

var debug = require('debug')('generate:defaults');

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
  debug('initializing <%s>, from <%s>', __dirname, module.parent.id);

  if (!app.isApp && !app.isGenerator) {
    return;
  }
  if (app.isRegistered('generate-defaults')) {
    return;
  }
  app.use(require('verb-repo-data'));
  app.use(require('verb-defaults'));
  return plugin;
};
