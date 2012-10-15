exports.minify = function (input, output, app) {
	var uglify = require('uglify-js2');
	var result = uglify.minify(input);
	result.code.to(output);
}
