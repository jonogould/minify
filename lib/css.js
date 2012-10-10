var shell = require('shelljs');

var minify = function (i, o) {
	return shell.exec(process.env.PWD + '/node_modules/requirejs/bin/r.js -o cssIn=' + i + ' out=' + o + ' optimizeCss=standard');
}

exports.minify = minify;
