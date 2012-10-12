exports.minify = function (i, o, root) {
	var clc = require('cli-color');
	var shell = require('shelljs');
	var cmd = 'pngcrush -rem alla -reduce -brute '+i+' '+o;
	console.log(clc.blue('INFO ') + 'compressing png, this might take a while');
	shell.exec(cmd, {silent: true});
}
