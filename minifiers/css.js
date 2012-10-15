var t = require('minify-util').t;
var shell = require('shelljs');

exports.minify = function (input, output, app) {
	var cmd = '{{dir}}/node_modules/requirejs/bin/r.js -o cssIn={{input}} out={{output}} optimizeCss=standard';
	var args = {
		dir    : app.__dirname,
		input  : input,
		output : output
	};
	shell.exec(t(cmd, args), {silent: true});
};
