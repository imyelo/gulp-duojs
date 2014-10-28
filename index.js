var gulp = require('gulp');
var Duo = require('duo');

var through = require('through2');
var _ = require('lodash');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

function gulpDuo (opts) {

  var options = _.defaults(opts || {}, {
    standalone: '',
    root: ''
  });

  function compile (content, callback) {
    Duo(root).entry(content, 'js').standalone(options.standalone).run(function (err, bundle) {
      callback(null, bundle);
    });
  }

  function duo (file, encoding, callback) {
    if (file.isNull()) {
      callback(null, file);
    }
    if (file.isBuffer()) {
      compile(file.contents.toString(), function (err, bundle) {
        file.contents = new Buffer(bundle);
        callback(null, file);
      });
    }
    if (file.isStream()) {
      // not tested
      compile(file.contents.toString(), function (err, bundle) {
        file.contents.write(bundle);
        callback(null, file);
      });
    }
  }

  return through.obj(duo);
}

module.exports = gulpDuo;
