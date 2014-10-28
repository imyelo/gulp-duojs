var gulp = require('gulp');
var Duo = require('duo');

var through = require('through2');
var _ = require('lodash');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

function gulpDuo (opts) {

  var options = _.defaults(opts || {}, {
    standalone: ''
  });

  function compile (path, callback) {
    Duo(root).entry(path).standalone(options.standalone).run(function (err, bundle) {
      callback(null, bundle);
    });
  }

  function duo (file, encoding, callback) {
    if (file.isNull()) {
      callback(null, file);
    }
    compile(file.path, function (err, bundle) {
      if (err) {
        callback(err);
      }
      if (file.isBuffer()) {
        file.contents = new Buffer(bundle);
      }
      if (file.isStream()) {
        file.contents.write(bundle);
      }
      callback(null, file);
    });
  }

  return through.obj(duo);
}

module.exports = gulpDuo;
