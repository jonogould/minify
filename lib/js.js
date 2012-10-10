var shell = require('shelljs');

var minify = function (i, o) {
	// expects uglifyjs2 to be installed globally
	return shell.exec('uglifyjs2 ' + i + ' --output ' + o);
}

exports.minify = minify;
