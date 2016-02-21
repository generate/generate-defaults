'use strict';

var collections = require('generate-collections');
var utils = require('./utils');

/**
 * Lazily-extend your generator with the following line of code.
 *
 * ```js
 * app.extendWith(require('generate-defaults'));
 * ```
 * @param {Object} `app` instance of generator, verb or assemble.
 * @api public
 */

function generator(app, base) {
  app.task('defaults', { silent: true }, task(app, base.options));
  app.task('default', ['defaults']);
}

/**
 * Exposes the task function directly, allowing you to register
 * the task with whatever name you want.
 *
 * ```js
 * var defaults = require('generate-defaults');
 * app.task('foo', defaults.task(app));
 * ```
 * @name .task
 * @param {Object} `app`
 * @return {Function} Returns the task callback
 * @api public
 */

function task(app, options) {
  defaults(app, options);

  return function(cb) {
    app.build(['collections'], cb);
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
  app.extendWith(require('generate-collections'));

  // merge generator options with instance options
  var opts = utils.merge({}, app.options, options);

  // engines
  app.engine('*', utils.engine, opts.engine);

  // helpers
  app.helper('date', utils.date);

  // data
  app.data({cwd: opts.cwd || app.cwd});
  app.data({year: new Date().getFullYear()});
  app.data(app.store.data || {});
  app.data(app.pkg.data || {});
  app.data({author: expandPerson(app.data('author'))});
  app.data({owner: owner(app, app.pkg.data) || app.options.owner});
  app.data(app.base.cache.data);

  // middleware
  app.use(utils.middleware());
};

/**
 * Expose generators on `invoke`
 */

generator.invoke = function(app, options) {
  collections.invoke(app, options);
  defaults(app, options);
};

/**
 * Expose the `defaults` task as a function, so it can
 * be customized by the user
 */

generator.task = task;

/**
 * Create `owner` variable for templates context
 */

function owner(app, pkg) {
  var repo = pkg.repository;
  if (utils.isObject(repo)) {
    repo = repo.url;
  }
  if (typeof repo === 'string') {
    var obj = utils.parseGithubUrl(repo);
    return obj.owner;
  }
  return app.data('author.username');
}

/**
 * Expand person strings into objects
 */

function expandPerson(str) {
  var person = {};
  if (Array.isArray(str)) {
    str.forEach(function(val) {
      person = utils.merge({}, person, utils.parseAuthor(val));
    });
  } else if (typeof str === 'string') {
    person = utils.merge({}, person, utils.parseAuthor(str));
  } else if (str && typeof str === 'object') {
    person = utils.merge({}, person, str);
  }
  if (!person.username && person.url && /github\.com/.test(person.url)) {
    person.username = person.url.slice(person.url.lastIndexOf('/') + 1);
  }
  if (!person.twitter && person.username) {
    person.twitter = person.username;
  }
  person = utils.omitEmpty(person);
  return person;
}

/**
 * Expose `generator`
 */

module.exports = generator;
