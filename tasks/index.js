/*
 * grunt-rigger
 * https://github.com/damo/grunt-rigger
 *
 * Copyright (c) 2012 Damon Oehlman <damon.oehlman@sidelab.com>
 * Licensed under the MIT license.
 */

'use strict';

var runner = require('./runner');
var desc = 'This is a grunt plugin for the tool rigger which provides ' + 
  'targetted include functionality.';

module.exports = function(grunt) {
  // register a rigger task (the more obvious name)
  grunt.registerMultiTask('rigger', desc, runner(grunt));

  // register a rig task (backwards compat)
  grunt.registerMultiTask('rig', desc, runner(grunt));
};