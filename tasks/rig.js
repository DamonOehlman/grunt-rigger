/*
 * grunt-rigger
 * https://github.com/damo/grunt-rigger
 *
 * Copyright (c) 2012 Damon Oehlman <damon.oehlman@sidelab.com>
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path'),
    rigger = require('rigger');

module.exports = function(grunt) {
  var async = grunt.util.async;

  grunt.registerMultiTask('rig', 'This is a grunt plugin for the tool rigger which provides targetted include functionality.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      separator: grunt.util.linefeed,
      banner: '',
      footer: '',
      process: false
    });

    // async task callback
    var done = this.async();

    // Normalize boolean options that accept options objects.
    if (options.process === true) { options.process = {}; }

    // Process banner and footer.
    var banner = grunt.template.process(options.banner);
    var footer = grunt.template.process(options.footer);

    // Iterate over all src-dest file pairs.
    async.forEach(this.files, function(f, cb) {
      // Concat banner + specified files + footer.
      var src = banner;

      async.map(
        f.src.filter(function(filepath) {
          // Warn on and remove invalid source files (if nonull was set).
          if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
          } else {
            return true;
          }
        }), 
        function(filepath, cb) {
          // rig file
          rig(filepath, f.dest, function(err, src) {
            if (err) {
              grunt.log.warn('Failed to rig file "' + filepath);
              return cb(err);
            }

            // Process files as templates if requested.
            if (options.process) {
              src = grunt.template.process(src, options.process);
            }

            cb(null, src);
          });
        }, 
        function(err, files) {
          if (err) {
            grunt.log.warn('Failed with error: "' + err);
            return cb(err);
          }

          src += files.join(grunt.util.normalizelf(options.separator)) + footer;
          
          // Write the destination file.
          grunt.file.write(f.dest, src);

          // Print a success message.
          grunt.log.writeln('File "' + f.dest + '" created.');

          cb();
        }
      );
    },
    function(err) {
      if (err) {
        grunt.log.warn('Failed with error: "' + err);
        return done(err);
      }
      done();
    });
  });

  function rig(filepath, targetpath, callback) {
    // rigger options
    var option = {
      cwd: path.resolve(path.dirname(filepath)),
      filetype: path.extname(filepath).slice(1),
      targetType: path.extname(targetpath).slice(1)
    };
        
    // get the file content
    var content = grunt.file.read(filepath);

    rigger.process(content, option, callback);
  }
};