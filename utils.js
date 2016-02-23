'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('common-middleware', 'middleware');
require('engine-base', 'engine');
require('helper-date', 'date');
require('isobject', 'isObject');
require('mixin-deep', 'merge');
require('omit-empty');
require('parse-author');
require('parse-github-url');
require = fn;

/**
 * Expose `utils` modules
 */

module.exports = utils;
