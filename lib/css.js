exports.minify = function (i, o, root) {
	var shell = require('shelljs');
	shell.exec(root + '/node_modules/requirejs/bin/r.js -o cssIn=' + i + ' out=' + o + ' optimizeCss=standard', {silent: true});
}
