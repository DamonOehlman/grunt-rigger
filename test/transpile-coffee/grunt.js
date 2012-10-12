module.exports = function(grunt) {
    grunt.initConfig({
        rig: {
            compile: {
                'dist/main.js': 'src/main.coffee'
            }
        }
    });

    grunt.loadTasks('../../tasks');
};