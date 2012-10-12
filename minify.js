#!/usr/bin/env node

// node modules
var fs = require('fs');

// npm modules
var app = require('commander');
var _ = require('underscore');
var clc = require('cli-color');

// app modules
var util = require(__dirname + '/lib/util');

String.prototype.endsWith = function (str) {
	return this.substr(-str.length) === str;
};

app
	.version('0.2.0')
	.option('-o, --output [path]', 'specify an output path (optional).')
	.option('-h, --hash', 'prepends the abbreviated git commit hash to the output filename.')
	.option('-n, --nomin', "don't add .min to the output, requires an output path to be set")
	.parse(process.argv);

var supported = ['js', 'css', 'php', 'html', 'png', 'jpeg', 'jpg'];

_.each(app.args, function (file) {

	var extension = _.last(file.split('.'));

	// skip files that contain '.min'
	if (file.search('.min') > 0) {
		console.log(clc.underline('Skipping ' + '"' + file + '"'));
		console.log('');
		return;
	}

	// make sure filetype is supported
	if (! _.contains(supported, extension)) return;

	// create the output filename
	var output = util.output(file, app);

	// grab the appropriate minifier
	var lib = extension;
	if (lib === 'jpeg') lib = 'jpg';
	var minifier = require(__dirname + '/lib/' + lib);

	if (extension === 'jpeg' || extension === 'jpg' || extension === 'png') {
		var message = 'Compressing';
	} else {
		var message = 'Minifying';
	}

	console.log(clc.underline(message + ' "' + file + '"'));

	// hot sauce
	minifier.minify(file, output, __dirname);

	var saved = fs.statSync(file).size - fs.statSync(output).size;

	console.log(clc.green('SAVED ') + output);
	console.log(clc.blue('INFO ') + 'file size reduced by ' + saved + 'B');
	console.log('');

});
