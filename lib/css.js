var shell = require('shelljs');

var minify = function (i, o) {
	var paths = process.mainModule.paths;
	shell.exec(paths[0] + '/requirejs/bin/r.js -o cssIn=' + i + ' out=' + o + ' optimizeCss=standard', {silent: true});
}

exports.minify = minify;
