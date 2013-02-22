/*
 * grunt-rigger
 * https://github.com/damo/grunt-rigger
 *
 * Copyright (c) 2012 Damon Oehlman <damon.oehlman@sidelab.com>
 * Licensed under the MIT license.
 */
 
var reFileDirective = /^file\_/i,
    path = require('path'),
    async = require('async'),
    rigger = require('rigger');

module.exports = function(grunt) {
  
  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('rig', 'Your task description goes here.', function() {
    // get the files
    var files = this.files,
        callback = this.async(),
        rigTask = this;

    this.files.forEach(function(f) {
        rig(f, function(err, data) {
            // write the output file
            grunt.file.write(f.dest, data);
            grunt.log.writeln('File "' + f.dest + '" created.');
            
            // TODO: error handling for async 

            // trigger the callback
            callback();
        });
    });


  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  function rig(files, options, callback) {
    // expand the directives
    var fileOpts = files.src.map(function(filepath) {
        // var directive = grunt.task.getDirectiveParts(filepath);
        
        // // if the directive is a file directive, then extract the basepath
        // if (directive && reFileDirective.test(directive[0])) {
        //     filepath = directive[1];
        // }
        // // otherwise if we are dealing with a directive, then reset the filepath
        // else if (directive) {
        //     filepath = '';
        // }
    
        // return the directory for the path
        return filepath ? {
            cwd: path.resolve(path.dirname(filepath)),
            filetype: path.extname(filepath).slice(1)
        } : null;
    }),
        
    // get the file contents
    fileContents = files.src.map(function(filepath) {
      return grunt.file.read(filepath);
    }),
    
    // define a file index to sync the contents map with basePath
    // it's a bit hacky but async doesn't tell us
    fileIndex = 0;
        
    // remap options if required
    if (typeof options === 'function') {
        callback = options;
        options = {};
    }
    
    // ensure we have options
    options = options || {};
    
    // default the separate to linefeed as per concat
    options = grunt.util._.defaults(options || {}, {
      separator: grunt.util.linefeed
    });

    // process each of the files that need to be rigged
    async.map(
        fileContents,
        
        function(data, itemCallback) {
            rigger.process(data, fileOpts[fileIndex++], itemCallback);
        },

        function(err, results) {
            callback(err, results.join(grunt.util.normalizelf(options.separator)));
        }
    );
  }

};
