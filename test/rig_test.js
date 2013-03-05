'use strict';

var grunt = require('grunt');

exports.rig = {
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/default_options.js');
    var expected = grunt.file.read('test/expected/default_options.js');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
  },
  custom_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/custom_options.js');
    var expected = grunt.file.read('test/expected/custom_options.js');
    test.equal(actual, expected, 'should add banner and footer.');

    test.done();
  },
  transpile: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/transpile_coffee.js');
    var expected = grunt.file.read('test/expected/transpile_coffee.js');
    test.equal(actual, expected, 'should transpile coffee to js.');

    test.done();
  },
  remote: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/remote.js');
    var expected = grunt.file.read('test/expected/remote.js');
    test.equal(actual, expected, 'should include remote file.');

    test.done();
  }
};