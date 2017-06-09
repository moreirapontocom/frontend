module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less','cssmin','uglify','watch']);

	grunt.initConfig({

        less: {
            production: {
                files: {
                    'css/styles.css': 'assets/css/styles.less'
                }
            }
        },

		cssmin: {
			combine: {
				files: {
                    'css/styles.min.css': [
                       'assets/vendor/flexboxgrid/dist/flexboxgrid.min.css',
                       'css/styles.css',
                    ]
				}
			}
		},

		uglify: {
			options: {
				mangle: false
			},
			js: {
				files: {
					'js/scripts.min.js': [
					   'assets/vendor/jquery/dist/jquery.min.js',
					   'assets/vendor/json2/json2.js',
					   'assets/vendor/underscore/underscore.js',
					   'assets/vendor/backbone/backbone.js',
					   'assets/vendor/backbone.marionette/lib/backbone.marionette.min.js',
					   'assets/vendor/bounce.js/bounce.min.js',
					   'assets/js/app.js'
					 ]
				}
			}
		},

        watch: {
			scripts: {
				files: ['assets/css/*.less','assets/js/*.js'],
				tasks: ['less','cssmin','uglify']
			},
			options: {
				debounceDelay: 1,
			}
		},

		

		// watch: {
		// 	scripts: {
		// 		files: ['app/storage/assets/css/*.css','app/storage/assets/js/*.js'],
		// 		tasks: ["cssmin","uglify"]
		// 	},
		// 	options: {
		// 		debounceDelay: 1,
		// 	}
		// }

	});

};