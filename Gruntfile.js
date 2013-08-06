module.exports = function(grunt) {
  "use strict";

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    banner: '/* <%= pkg.title %> v<%= pkg.version %>\n' +
      ' * Copyright (c) 2013 Frank Förster (http://frankfoerster.com)\n' +
      ' * Licensed under the MIT License\n' +
      ' */\n',

    concat: {
      options: {
        banner: '<%= banner %>',
        separator: ';'
      },
      build: {
        src: ['src/**/*.js'],
        dest: 'build/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>',
        mangle: true,
        wrap: false
      },
      build: {
        files: {
          'build/<%= pkg.name %>.min.js': ['<%= concat.build.dest %>']
        }
      }
    },

    watch: {
      default: {
        files: ['src/**/*.js'],
        tasks: ['concat', 'uglify']
      }
    }

  });

  grunt.registerTask('default', ['concat', 'uglify']);

};
