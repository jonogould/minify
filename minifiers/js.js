exports.minify = function (i, o, app) {
	var uglify = require('uglify-js2');
	var result = uglify.minify(i);
	result.code.to(o);
}
