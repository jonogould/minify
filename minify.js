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
	.parse(process.argv);

var supported = ['js', 'css', 'php', 'html'];

_.each(app.args, function (file) {

	var extension = _.last(file.split('.'));

	// skip files that contain '.min'
	if (file.search('.min') > 0) {
		console.log(clc.yellow('SKIPPED ') + file);
		return;
	}

	// make sure filetype is supported
	if (! _.contains(supported, extension)) return;

	// create the output filename
	var output = util.output(file, app);

	// grab the appropriate minifier
	var minifier = require(__dirname + '/lib/' + extension);

	// hot sauce
	minifier.minify(file, output, __dirname);

	var saved = fs.statSync(file).size - fs.statSync(output).size;

	console.log(clc.green('SAVED ') + output);
	console.log('file size reduced by ' + saved + 'B');
});
