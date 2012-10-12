module.exports = function(grunt) {
    grunt.initConfig({
        rig: {
            compile: {
                'dist/simple.js': 'src/simple.js'
            }
        }
    });
    
    grunt.loadTasks('../../tasks');
};