exports.minify = function (i, o, root) {
	var uglify = require('uglify-js2');
	var result = uglify.minify(i);
	result.code.to(o);
}
