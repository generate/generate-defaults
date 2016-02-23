# generate-defaults [![NPM version](https://img.shields.io/npm/v/generate-defaults.svg)](https://www.npmjs.com/package/generate-defaults) [![Build Status](https://img.shields.io/travis/jonschlinkert/generate-defaults.svg)](https://travis-ci.org/jonschlinkert/generate-defaults)

> Use this generator to add some common default settings to your 'generate', verb, and assemble generators.

You might also be interested in [generate](https://github.com/generate/generate).

## Install

Install as a `devDependency` with [npm](https://www.npmjs.com/):

```sh
$ npm install generate-defaults --save-dev
```

## Quickstart

**Getting started**

If you're not already familiar with [generate](https://github.com/generate/generate), you might find generate's [getting started guide](https://github.com/generate/generate/blob/master/docs/getting-started.md) useful before continuining.

<br>

***

## Usage

With both `generate-defaults` and `generate` installed globally, you should now be able to run this generator's default task with the following command:

```sh
$ gen defaults
```

If the generator and its task completed successfuly, you should see something like this in the terminal:

```sh
[00:44:21] starting defaults generator
[00:44:21] starting defaults:default task
[00:44:22] finished defaults:default task 63ms
[00:44:22] finished defaults generator 68ms
[00:44:22] finished ✔
```

## Extend your generator

The [usage instructions](#usage) explain how to use this as a standalone generator, but you can also use `generate-defaults` to extend your own generator, and cut down on boilerplate code needed to get up and running.

To extend your generator, add the  `.extendWith()` line inside your generator:

```js
var defaults = require('generate-defaults');

module.exports = function(app) {
  defaults.invoke(app[, options]);

  // do generator stuff
};
```

That's it! you should now be able to use any features from `generate-defaults` as if they were created in your own generator.

**Override settings**

You can override any feature or setting from `generate-defaults` by defining new values. E.g. we aren't doing any magic, the `.invoke` method just calls this generator in the context of your generator's instance.

## Advanced usage

**Lazily-extend your generator**

Run the `defaults` task to lazily add the features and settings from `generate-defaults`.

This approach offers the advantage of choosing when and where to invoke `generate-defaults` inside your own generator.

```js
module.exports = function(app) {
  app.extendWith(require('generate-defaults'));

  app.task('foo', function(cb) {
    // do task stuff
    cb();
  });

  app.task('default', ['defaults', 'foo']);
};
```

**Note that** _before running task `foo`, you MUST RUN the `defaults` task_ to get the features from `generate-defaults` loaded onto your generator's instance.

## API

### [generator](generator.js#L16)

Lazily-extend your generator with the following line of code.

**Params**

* `app` **{Object}**: instance of generator, verb or assemble.

**Example**

```js
app.extendWith(require('generate-defaults'));
```

### [.task](generator.js#L35)

Exposes the task function directly, allowing you to register the task with whatever name you want.

**Params**

* `app` **{Object}**
* `returns` **{Function}**: Returns the task callback

**Example**

```js
var defaults = require('generate-defaults');
app.task('foo', defaults.task(app));
```

### [.invoke](generator.js#L59)

Exposes the generator on the `invoke` property, allowing you to load the default settings where it makes sense.

**Params**

* `app` **{Object}**
* `options` **{Object}**

**Example**

```js
var default = require('generate-default');

// in your generator
default.invoke(app, [options]);
```

## What's included?

When [invoked](#usage), this generator adds the following default configuration settings to your generator:

* Four template collections from [generate-collections](https://github.com/jonschlinkert/generate-collections): `layouts`, `includes`, `docs` and `badges`
* Template engine (registered as `*`), for processing erb/lodash style templates
* A `date` helper that can be used in templates
* If a `package.json` exists in the cwd, it's loaded onto the context for rendering templates
* Adds the routes and middleware from [common-middleware](https://github.com/jonschlinkert/common-middleware).

If a collection does already exist on the instance, its options will be updated with any options defined on your application instance, or options passed directly to the [load](#load) function.

## Compatibility

This generator works with:

* [generate](https://github.com/generate/generate)
* [verb](https://github.com/verbose/verb)
* update (soon)
* assemble (soon)

## Related projects

* [assemble](https://www.npmjs.com/package/assemble): Assemble is a powerful, extendable and easy to use static site generator for node.js. Used… [more](https://www.npmjs.com/package/assemble) | [homepage](https://github.com/assemble/assemble)
* [generate](https://www.npmjs.com/package/generate): Fast, composable, highly extendable project generator with a user-friendly and expressive API. | [homepage](https://github.com/generate/generate)
* [verb](https://www.npmjs.com/package/verb): Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used… [more](https://www.npmjs.com/package/verb) | [homepage](https://github.com/verbose/verb)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/generate-defaults/issues/new).

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install verb && npm run docs
```

Or, if [verb](https://github.com/verbose/verb) is installed globally:

```sh
$ verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016 [Jon Schlinkert](https://github.com/jonschlinkert)
Released under the [MIT license](https://github.com/jonschlinkert/generate-defaults/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on February 23, 2016._