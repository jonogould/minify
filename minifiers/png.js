var t = require('minify-util').t;
var shell = require('shelljs');

exports.minify = function (input, output, app) {
	var cmd = 'pngcrush -rem alla -reduce -brute {{input}} {{output}}';
	var args = {
		input  : input,
		output : output
	};
	shell.exec(t(cmd, args), {silent: true});
};
