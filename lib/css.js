var shell = require('shelljs');

var minify = function (i, o) {
	// expects r.js to be installed globally
	return shell.exec('r.js -o cssIn=' + i + ' out=' + o + ' optimizeCss=standard');
}

exports.minify = minify;
