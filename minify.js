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
	.option('-g, --git-hash', 'prepends the abbreviated git commit hash to the output filename.')
	.option('-n, --nomin', "don't add .min to the output, requires an output path to be set")
	.option('--nophp', 'skip php files')
	.option('--nohtml', 'skip html files')
	.option('--nocss', 'skip css files')
	.option('--nojs', 'skip javascript files')
	.option('--nopng', 'skip png files')
	.option('--nojpeg', 'skip jpeg/jpg files')
	.option('--noimages', 'skip images')
	.parse(process.argv);

// check for input files
if (app.args.length === 0) {
	console.log("watsup yo! you didn't select any files");
}

// check for git
if (! shell.which('git')) {
	console.log('oops, please install git');
	shell.exit(-1);
}

// check for jpegtran
if (! shell.which('jpegtran')) {
	console.log('oops, please install jpegtran');
	shell.exit(-1);
}

// check for optipng
if (! shell.which('optipng')) {
	console.log('oops, please install optipng');
	shell.exit(-1);
}

// --nomin requires an output to be set
if (app.nomin && ! app.output) {
	console.log(clc.red('ERROR ') + 'To use the --nomin flag you must set an output path.');
	shell.exit(-1);
}

var supported = ['js', 'css', 'php', 'html', 'png', 'jpeg', 'jpg'];

var skip = [];

if (app.nophp) skip.push('php');
if (app.nohtml) skip.push('html');
if (app.nocss) skip.push('css');
if (app.nojs) skip.push('js');
if (app.nopng) skip.push('png');
if (app.nojpeg) skip.push('jpeg', 'jpg');
if (app.noimages) skip.push('png', 'jpg', 'jpeg');

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

	var lib = extension;
	if (lib === 'jpeg') lib = 'jpg';

	// grab the appropriate minifier
	var minifier = require(__dirname + '/lib/' + lib);

	if (extension === 'jpeg' || extension === 'jpg' || extension === 'png') {
		var message = 'Compressing';
	} else {
		var message = 'Minifying';
	}

	console.log(clc.underline(message + ' "' + file + '"'));

	// hot sauce
	minifier.minify(file, output, __dirname);

	var diff = fs.statSync(file).size - fs.statSync(output).size;

	console.log(clc.green('SAVED ') + output);
	console.log(clc.blue('INFO ') + 'file size reduced by ' + diff + 'B');
	console.log('');

});
