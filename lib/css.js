exports.minify = function (i, o, root) {
	var shell = require('shelljs');
	var cmd = root + '/node_modules/requirejs/bin/r.js -o cssIn=' + i + ' out=' + o + ' optimizeCss=standard';
	shell.exec(cmd);
}
