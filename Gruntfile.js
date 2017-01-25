module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

		sass: {  // Task
			dist: {  // Target
				options: {                     
					style: 'nested'
				},
				files: {                    
					'www/css/style.css': 'www/css/style.scss', // 'destination': 'source'
					'www/css/jquery.mobile-1.4.5-mod.min.css': 'www/css/jquery.mobile-1.4.5-mod.scss',
					'cms/css/style.css': 'cms/css/style.scss', 
					'cms/css/bootstrap.css': 'cms/css/bootstrap.scss'
				}
		    }
		},
		watch: {
			options: {
				livereload: true
			},
/*
		    scripts: {
		        files: ['js/*.js'],
		        tasks: ['uglify'],
		        options: {
		            spawn: false,
		        },
		    },
*/
		    css: {
			    files: ['www/css/*.scss', 'cms/css/*.scss'],
			    tasks: ['sass'],
			    options: {
			        spawn: false
			    },
			} 
		}
		
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['watch']);

};