var t = require('minify-util').t;
var shell = require('shelljs');

exports.minify = function (input, output, app) {
	var cmd = 'java -jar {{dir}}/bin/htmlcompressor-1.5.3.jar {{input}} -o {{output}}';
	var args = {
		dir    : app.__dirname,
		input  : input,
		output : output
	};
	shell.exec(t(cmd, args), {silent: true});
};
