/*global module:false, require:false, __dirname:false*/

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    copy: {
      libs : {
        files : [
          { expand: true, cwd : 'libs/', src: ['**/*.*'], dest: 'dist/libs/' }
        ]
      },
      fonts : {
        files : [
          { expand: true, cwd : 'src/themes/proton/fonts', src: ['**/*.*'], dest: 'dist/themes/proton/fonts' }
        ]
      }
    },
    less: {
      production: {
        options : {
          cleancss : true,
          compress : true
        },
        files: {
          "dist/themes/default/style.min.css" : "src/themes/default/style.less",
          "dist/themes/proton/style.min.css" : "src/themes/proton/style.less"
        }
      },
      development: {
        files: {
          "src/themes/default/style.css" : "src/themes/default/style.less",
          "dist/themes/default/style.css" : "src/themes/default/style.less",
          "src/themes/proton/style.css" : "src/themes/proton/style.less",
          "dist/themes/proton/style.css" : "src/themes/proton/style.less"
        }
      }
    },
    imagemin: {
      dynamic: {
        options: {                       // Target options
          optimizationLevel: 7,
          pngquant : true
        },
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd:  'src/themes/default/',    // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'dist/themes/default/'   // Destination path prefix
        },{
          expand: true,                  // Enable dynamic expansion
          cwd:  'src/themes/proton/',    // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'dist/themes/proton/'   // Destination path prefix
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

   // Default task, generate theme sprite images and CSS
  grunt.registerTask('default', ['imagemin', 'copy:libs', 'copy:fonts', 'less']);
};
