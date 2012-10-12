#!/usr/bin/env node

// node modules
var fs = require('fs');

// npm modules
var app = require('commander');
var _ = require('underscore');
var clc = require('cli-color');
var shell = require('shelljs');

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
	.option('-n, --nophp', 'skip php files')
	.option('-n, --nohtml', 'skip html files')
	.option('-n, --nocss', 'skip css files')
	.option('-n, --nojs', 'skip javascript files')
	.option('-n, --nopng', 'skip png files')
	.option('-n, --nojpeg', 'skip jpeg/jpg files')
	.option('-n, --noimages', 'skip images')
	.parse(process.argv);

var supported = ['js', 'css', 'php', 'html', 'png', 'jpeg', 'jpg'];

var skip = [];

if (app.nophp) skip.push('php');
if (app.nohtml) skip.push('html');
if (app.nocss) skip.push('css');
if (app.nojs) skip.push('js');
if (app.nopng) skip.push('png');
if (app.nojpeg) skip.push('jpeg', 'jpg');
if (app.noimages) skip.push('png', 'jpg', 'jpeg');

if (app.nomin && ! app.output) {
	console.log(clc.red('ERROR ') + 'To use the --nomin flag you must set an output path.');
	shell.exit(-1);
}

_.each(app.args, function (file) {

	var extension = _.last(file.split('.'));

	// check if we're manually skipping this filetype
	if (_.contains(skip, extension)) return;

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
