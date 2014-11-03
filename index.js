var _ = require('lodash');
var Duo = require('duo');

var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-duo';

function gulpDuo (opts, func) {

  var options = _.defaults(opts || {}, {
    root: __dirname,
    standalone: '',
    development: false,
    cache: true,
    copy: false,
    global: '',
    concurrency: 50
  });

  func = _.isFunction(func) ? func : function () {};

  function compile (path, callback) {
    var duo = Duo(options.root)
      .entry(path)
      .standalone(options.standalone)
      .development(options.development)
      .cache(options.cache)
      .copy(options.copy)
      .global(options.global)
      .concurrency(options.concurrency);
    func(duo);
    duo.run(function (err, bundle) {
      callback(null, bundle);
    });
  }

  function duo (file, encoding, callback) {
    if (file.isNull()) {
      return callback(null, file);
    }
    compile(file.path, function (err, bundle) {
      if (err) {
        return callback(err);
      }
      if (file.isBuffer()) {
        file.contents = new Buffer(bundle);
      }
      if (file.isStream()) {
        callback(new PluginError(PLUGIN_NAME, 'Streams not supported!'));
      }
      callback(null, file);
    });
  }

  return through.obj(duo);
}

module.exports = gulpDuo;
