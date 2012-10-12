module.exports = function(grunt) {
    grunt.initConfig({
        rig: {
            compile: {
                files: {
                    'dist/main.js': 'src/main.js'
                }
            }
        }
    });
    
    grunt.loadTasks('../../tasks');
};