/*
 * grunt-rigger
 * https://github.com/damo/grunt-rigger
 *
 * Copyright (c) 2012 Damon Oehlman <damon.oehlman@sidelab.com>
 * Licensed under the MIT license.
 */
 
var reFileDirective = /^file\_/i,
    path = require('path'),
    fs = require('fs'),
    rigger = require('rigger'),
    grunt = require('grunt'),
    async = grunt.utils.async,
    _ = grunt.utils._,
    riggerOpts = {},
    helpers = {};
  
// initialise the compile helper
helpers.compile = function() {
    var files = [],
        done = this.async();

    // iterate through the files 
    _.forEach(this.data, function(src, dst) {
        files.push({ src: src, dst: dst });
    });
    
    async.forEach(
        files,
        function(file, itemCallback) {
            var destFile = path.resolve(file.dst),
                opts = _.defaults(riggerOpts, {
                    targetType: path.extname(destFile)
                });
            
            rigger(path.resolve(file.src), opts, function(err, output) {
                if (err) return itemCallback(err);
                
                grunt.file.mkdir(path.dirname(destFile));
                fs.writeFile(destFile, output, 'utf8', itemCallback);
            });
        },
        done
    );
};
    
function rigFiles() {
    if (this.target == 'opts') {
        riggerOpts = _.clone(this.data);
    }
    
    // call the appropriate helper
    (helpers[this.target] || helpers.compile).call(this);
}

module.exports = function(grunt) {
  
  // register the rig and rigger tasks
  grunt.registerMultiTask('rig', 'Rig files using targetting include patterns', rigFiles);
  grunt.registerMultiTask('rigger', 'Rig files using targetting include patterns', rigFiles);
};
