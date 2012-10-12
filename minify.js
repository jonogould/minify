#!/usr/bin/env node

var app = require('commander');
var util = require(__dirname + '/lib/util');
var _ = require('underscore');

String.prototype.endsWith = function (str) {
	return this.substr(-str.length) === str;
};

app
	.version('0.2.0')
	.option('-o, --output', 'Specify an output path (optional).')
	.option('-h, --hash', 'Prepends the abbreviated git commit hash to the output filename.')
	.parse(process.argv);

var supported = ['js', 'css', 'php', 'html'];

_.each(app.args, function (file) {

	var extension = _.last(file.split('.'));

	// make sure filetype is supported
	if (! _.contains(supported, extension)) return;

	// skip files that contain '.min'
	if (file.search('.min') > 0) return;

	// create the output filename
	var output = util.output(file, app);

	// grab the appropriate minifier
	var minifier = require(__dirname + '/lib/' + extension);

	minifier.minify(file, output, __dirname);

});
