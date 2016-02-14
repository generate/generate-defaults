'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('common-middleware', 'middleware');
require('extend-shallow', 'extend');
require('engine-base', 'engine');
require('helper-date', 'date');
require('isobject', 'isObject');
require = fn;

/**
 * Expose `utils` modules
 */

module.exports = utils;
