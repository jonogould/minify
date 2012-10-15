exports.minify = function (i, o, app) {
	var clc = require('cli-color');
	var shell = require('shelljs');
	var cmd = 'pngcrush -rem alla -reduce -brute '+i+' '+o;
	shell.exec(cmd, {silent: true});
}
