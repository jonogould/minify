exports.minify = function (i, o, root) {
	var clc = require('cli-color');
	var shell = require('shelljs');
	var cmd = 'jpegtran -copy none -optimize -perfect -outfile ' + o + ' ' + i;
	console.log(clc.blue('INFO ') + 'compressing jpg, this might take a while');
	shell.exec(cmd, {silent: true});
}
