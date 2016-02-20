'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('common-middleware', 'middleware');
require('empty-dir', 'empty');
require('engine-base', 'engine');
require('helper-date', 'date');
require('isobject', 'isObject');
require('mixin-deep', 'merge');
require('omit-empty');
require('parse-author');
require('parse-github-url');
require = fn;

utils.isEmpty = function(dir) {
  return utils.empty.sync(dir, function(fp) {
    return !/\.DS_Store/i.test(fp);
  });
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
