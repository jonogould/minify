var uglify = require('uglify-js2');

var minify = function (i, o) {
	var result = uglify.minify(i);
	result.code.to(o);
}

exports.minify = minify;
