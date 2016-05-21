module.exports = function(grunt) {

  grunt.initConfig({

    // starts express server
    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: './bin/www',
          debug: true
        }
      },
      prod: {
        options: {
          script: './bin/www',
          node_env: 'production'
        }
      },
      test: {
        options: {
          script: './bin/www'
        }
      }
    },

    // takes all the js files and minify them into head.min.js and body.min.js
    uglify: {
      build: {
        files: {
          './public/dist/js/head.min.js': ['./node_modules/angular/angular.min.js', './node_modules/angular-route/angular-route.min.js', './static/javascripts/*.js'],
          './public/dist/js/body.min.js': ['./node_modules/jquery/dist/jquery.min.js', './node_modules/bootstrap/dist/js/bootstrap.min.js', './static/javascripts/*.js']
        }
      }
    },

    // takes all the css files and minify them into style.min.css
    cssmin: {
      build: {
        files: {
          './public/dist/css/style.min.css': ['./node_modules/bootstrap/dist/css/bootstrap.min.css', './static/stylesheets/*.css']
        }
      }
    },

    // watches for changes in css and js files and process the above tasks when those are happening
    watch: {
      css: {
        files: ['./static/stylesheets/*.css'],
        tasks: ['cssmin']
      },
      js: {
        files: ['./static/javascripts/*.js'],
        tasks: ['uglify']
      },
      express: {
        files:  [ '**/*.js' ],
        tasks:  [ 'express:dev' ],
        options: {
          spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
        }
      }
    }

  });

  // loads all above tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');

  // registers all above tasks when grunt is running
  grunt.registerTask('default', ['cssmin', 'uglify', 'express:dev', 'watch']);

}
