/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    watch: {
      core: {
        files: ['src/*.coffee'],
        tasks: ['coffee:core']
      },
      example: {
        files: ['example/coffee/*.coffee'],
        tasks: ['coffee:example']
      },
      cloud: {
        files: ['example/parse/src/*.coffee'],
        tasks: ['coffee:cloud', 'parse-deploy']
      }
    },

    coffee: {
      core: {
        expand: true,
        cwd: 'src',
        src: ['*.coffee'],
        dest: '.',
        ext: '.js'
      },
      example: {
        expand: true,
        cwd: 'example/coffee',
        src: ['*.coffee'],
        dest: 'example/js',
        ext: '.js'
      },
      cloud: {
        expand: true,
        cwd: 'example/parse/src',
        src: ['*.coffee'],
        dest: 'example/parse/cloud',
        ext: '.js'
      }
    },
    testacularServer: {
      unit: {
        configFile: "testacular.conf.js"
      }
    }
  });

  grunt.loadNpmTasks('grunt-testacular');
  grunt.loadNpmTasks('grunt-contrib-coffee');

  // Default task.
  grunt.registerTask('default', 'coffee');

  grunt.registerTask('dev', 'server testacularServer watch')

  grunt.registerTask('parse-deploy', function () {
    var done = this.async();


    grunt.utils.spawn({
      cmd: "parse",
      args: ["deploy"],
      opts: {
        cwd: "./example/parse"
      }
    },function () {done(); });
  });


};
