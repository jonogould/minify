exports.minify = function (i, o, app) {
	var shell = require('shelljs');
	var cmd = app.__dirname + '/node_modules/requirejs/bin/r.js -o cssIn=' + i + ' out=' + o + ' optimizeCss=standard';
	shell.exec(cmd, {silent: true});
}
