module.exports = function(grunt) {

	// grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

	// grunt.registerTask("default", ["cssmin","uglify","watch"]);
    grunt.registerTask('default', ['less','cssmin','watch']);

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

        watch: {
			scripts: {
				files: ['assets/css/*.less'],
				tasks: ['less','cssmin']
			},
			options: {
				debounceDelay: 1,
			}
		},

		// uglify: {
		// 	options: {
		// 		mangle: false
		// 	},
		// 	js: {
		// 		files: {
		// 			'public/js/scripts.min.js': [
		// 			   'public/packages/jquery/dist/jquery.min.js',
		// 			   'public/theme/assets/lib/perfect-scrollbar/js/perfect-scrollbar.jquery.min.js',
		// 			   'public/theme/assets/js/main.js',

		// 			   'public/packages/bootstrap/dist/js/bootstrap.min.js',
		// 			   'public/theme/assets/lib/summernote/summernote.min.js',
		// 			   'public/theme/assets/lib/summernote/summernote-ext-beagle.js',

		// 			   'public/theme/assets/lib/bootstrap-markdown/js/bootstrap-markdown.js',
		// 			   'public/theme/assets/lib/markdown-js/markdown.js',

		// 			   'public/packages/jquery-ui/jquery-ui.min.js',

		// 			   'app/storage/assets/js/scripts.js'
		// 			 ]
		// 		}
		// 	}
		// },

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