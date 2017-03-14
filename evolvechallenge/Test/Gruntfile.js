module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		cucumberjs: {
			src: 'features',
			options: {
				steps: 'features/step_definitions',
				format: 'pretty',
				
			}
		}
		
    });
	
	grunt.loadNpmTasks('grunt-cucumber');
    grunt.registerTask('default', []);

};
