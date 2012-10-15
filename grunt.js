module.exports = function(grunt) {

	grunt.initConfig({
		lint: {
			all: ['grunt.js', 'minifiers/*', 'node_modules/minify-*/*']
		}
	});

	grunt.registerTask('default', 'lint');

};
