var assert = require('assert'),
    grunt = require('grunt'),
    path = require('path');
    
module.exports = function(target) {
    var opts = {
        config: path.resolve(__dirname, '..', target, 'grunt.js')
    }
    
    return function(done) {
        grunt.tasks('rig', opts, done);
    };
};