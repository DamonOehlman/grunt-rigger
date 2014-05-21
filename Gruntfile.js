/*
 * grunt-contrib-concat
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    banner_property: 'AWESOME',

    rigger: {
      default_options: {
        files: {
          'tmp/default_options.js': ['test/fixtures/default_options.js']
        }
      },
      custom_options: {
        options: {
          banner: '/* THIS TEST IS <%= banner_property %> */\n',
          footer: '\ndude'
        },
        files: {
          'tmp/custom_options.js': ['test/fixtures/default_options.js']
        }
      },
      transpile: {
        files: {
          'tmp/transpile_coffee.js': ['test/fixtures/transpile.coffee']
        }
      },
      transpile_bare: {
        files: {
          'tmp/transpile_bare_coffee.js': ['test/fixtures/transpile.coffee']
        },
        options: {
          bare: true
        }
      },
      remote: {
        files: {
          'tmp/remote.js': ['test/fixtures/remote.js']
        }
      }
    },

    rig: {
      default_options: {
        files: {
          'tmp/default_options.js': ['test/fixtures/default_options.js']
        }
      },
      custom_options: {
        options: {
          banner: '/* THIS TEST IS <%= banner_property %> */\n',
          footer: '\ndude'
        },
        files: {
          'tmp/custom_options.js': ['test/fixtures/default_options.js']
        }
      },
      transpile: {
        files: {
          'tmp/transpile_coffee.js': ['test/fixtures/transpile.coffee']
        }
      },
      transpile_bare: {
        files: {
          'tmp/transpile_bare_coffee.js': ['test/fixtures/transpile.coffee']
        },
        options: {
          bare: true
        }
      },
      remote: {
        files: {
          'tmp/remote.js': ['test/fixtures/remote.js']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'rigger', 'rig', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
