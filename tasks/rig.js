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
    
function logOutput(instance) {
    instance.on('include:file', function(file) {
        grunt.log.writeln('*including* ' + file.slice(process.cwd().length + 1));
    });
    
    instance.on('include:remote', function(target) {
        grunt.log.writeln('*including* ' + target);
    });
}
  
// initialise the compile helper
helpers.compile = function() {
    var files = [];

    // iterate through the files 
    _.forEach(this.data, function(src, dst) {
        files.push({ src: src, dst: dst });
    });
    
    async.forEach(files, rigTarget, this.async());
};
    
function rigFiles() {
    if (this.target == 'opts') {
        riggerOpts = _.clone(this.data);
    }
    
    // call the appropriate helper
    (helpers[this.target] || helpers.compile).call(this);
}

function rigTarget(target, callback) {
    // expand the directives
    var destFile = path.resolve(target.dst),
        files = [].concat(target.src || []),
        fileOpts = files.map(function(filepath) {
            var directive = grunt.task.getDirectiveParts(filepath);
        
            // if the directive is a file directive, then extract the basepath
            if (directive && reFileDirective.test(directive[0])) {
                filepath = directive[1];
            }
            // otherwise if we are dealing with a directive, then reset the filepath
            else if (directive) {
                filepath = '';
            }
        
            // return the directory for the path
            return filepath ? {
                cwd: path.resolve(path.dirname(filepath)),
                targetType: path.extname(filepath)
            } : null;
        }),
        
        // get the file contents
        fileContents = files.map(function(filepath) {
          return grunt.task.directive(filepath, grunt.file.read);
        }),
        
        opts = _.defaults(riggerOpts, {
            separator: grunt.utils.linefeed
        }),
        
        // initialise the file tracking index
        fileIndex = 0;
        
    // process each of the files that need to be rigged
    async.map(
        fileContents,
        
        function(data, itemCallback) {
            logOutput(rigger.process(data, _.defaults(fileOpts[fileIndex++], riggerOpts), itemCallback));
        },
    
        function(err, results) {
            grunt.file.mkdir(path.dirname(destFile));
            
            fs.writeFile(
                destFile,
                results.join(grunt.utils.normalizelf(opts.separator)),
                'utf8',
                callback);
        }
    );
}

module.exports = function(grunt) {
  
  // register the rig and rigger tasks
  grunt.registerMultiTask('rig', 'Rig files using targetting include patterns', rigFiles);
  grunt.registerMultiTask('rigger', 'Rig files using targetting include patterns', rigFiles);
};
