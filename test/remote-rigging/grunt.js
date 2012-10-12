module.exports = function(grunt) {
    grunt.initConfig({
        rig: {
            compile: {
                'dist/main.js': 'src/main.js'
            }
        }
    });
    
    grunt.loadTasks('../../tasks');
};