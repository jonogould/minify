var t = require('minify-util').t;
var shell = require('shelljs');

exports.minify = function (input, output, app) {
	var cmd = 'jpegtran -copy none -optimize -perfect -outfile {{output}} {{input}}';
	var args = {
		input  : input,
		output : output
	};
	shell.exec(t(cmd, args), {silent: true});
}
