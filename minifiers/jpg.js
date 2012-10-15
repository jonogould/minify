exports.minify = function (i, o, app) {
	var clc = require('cli-color');
	var shell = require('shelljs');
	var cmd = 'jpegtran -copy none -optimize -perfect -outfile ' + o + ' ' + i;
	shell.exec(cmd, {silent: true});
}
