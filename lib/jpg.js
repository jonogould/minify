exports.minify = function (i, o, root) {
	var shell = require('shelljs');
	var cmd = 'jpegtran -copy none -optimize -perfect -outfile ' + o + ' ' + i;
	shell.exec(cmd);
}
