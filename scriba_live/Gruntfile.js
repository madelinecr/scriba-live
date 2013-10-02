// http://blog.jtmoon.com/tag/ember-js/
module.exports = function(grunt) {
  grunt.initConfig({
    // Compile ember templates:
    emberTemplates: {
      all: {
        // In practice, this could be:
        // src: ['templates/**/*.hbs', 'templates/**/*.handlebars']
        src: ['public/javascripts/templates/*.hbs'],
        dest: 'public/javascripts/templates.js'
      },

      watch: {
        files: 'public/javascripts/templates/*.hbs',
        tasks: ['emberTemplates', 'livereload']
      },

      options: {
        templateName: function(name) {
          return name.replace('public/javascripts/templates/', '').replace('_template', '');
        }
      }
    }
  });

  // Load the plugin. This assumes you have installed it via NPM.
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('default', ['emberTemplates']);
}