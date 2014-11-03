/* jshint node: true */
/* global describe, it */

'use strict';

var assert = require('assert'),
    es = require('event-stream'),
    gutil = require('gulp-util'),
    PassThrough = require('stream').PassThrough,
    duo = require('..'),
    path = require('path'),
    fs = require('fs');


describe('gulp-cat', function() {
    it('should work in buffer mode', function (done) {
        var stream = duo();
        var result = fs.readFileSync(path.join(__dirname, './fixtures/dest.js'));
        var filePath = path.join(__dirname, './fixtures/src.js');
        var buffer = new Buffer(fs.readFileSync(filePath));
        var file = new gutil.File({
            path: filePath,
            contents: buffer
        });

        stream.on('data', function (newFile) {
            assert.equal(newFile.contents.toString(), result);
        });
        stream.on('end', function () {
            // fs.writeFile(path.join(__dirname, './fixtures/dest.js'), file.contents.toString());
            done();
        });

        stream.write(file);
        stream.end();
    });

});