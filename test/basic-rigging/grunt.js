module.exports = function(grunt) {
    grunt.initConfig({
        rig: {
            compile: {
                files: {
                    'dist/simple.js': 'src/simple.js'
                }
            }
        }
    });
    
    grunt.loadTasks('../../tasks');
};