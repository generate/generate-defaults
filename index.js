'use strict';

var collections = require('generate-collections');
var utils = require('./utils');

/**
 * When [invoked](#usage), this generate adds default configuration
 * settings to your generator, including:
 *
 * - three template collections: `layouts`, `includes` and `docs`
 * - template engine (registered as `*`), for processing erb/lodash style templates
 * - a `date` helper that can be used in templates
 * - loads `package.json` data onto the context for rendering templates (if one exists)
 * - adds the routes and middleware from [common-middleware][].
 *
 * If a collection does already exist on the instance, its options will
 * be updated with any options defined on your application instance,
 * or options passed directly to the [load](#load) function.
 *
 * In your generator:
 *
 * ```js
 * app.extendWith(require('generate-defaults'));
 * ```
 * @param {Object} `app` instance of generator, verb or assemble.
 * @api public
 */

module.exports = function(app) {
  app.task('defaults', { silent: true }, task(app));
  app.task('default', ['defaults']);
};

/**
 * Exposes the task function directly, allowing you to register
 * the task with whatever name you want.
 *
 * ```js
 * var defaults = require('generate-defaults');
 * app.task('foo', defaults.task(app));
 * ```
 * @param {Object} `app`
 * @return {Function} Returns the task callback
 * @api public
 */

function task(app) {
  return function(cb) {
    defaults(app);
    cb();
  };
}

/**
 * Exposes the generator on the `invoke` property, allowing you to load
 * the default where it makes sense.
 *
 * ```js
 * var default = require('generate-default');
 *
 * // in your generator
 * default.invoke(app, [options]);
 * ```
 * @name .invoke
 * @param {Object} `app`
 * @param {Object} `options`
 * @api public
 */

function defaults(app, options) {
  var opts = utils.extend({}, app.options, options);

  // engines
  app.engine('*', utils.engine, opts.engine);

  // helpers
  app.helper('date', utils.date);

  // data
  app.data({cwd: opts.cwd || app.cwd});
  app.data({year: new Date().getFullYear()});
  app.data(app.pkg.data || {});

  // middleware
  app.use(utils.middleware());

  // template collections
  collections.invoke(app, opts);
};

/**
 * Expose defaults on the `load` property and as a task.
 */

module.exports.invoke = defaults;
module.exports.task = task;
