#!/usr/bin/env node

var fs = require('fs');
var program = require('commander');
var shell = require('shelljs');
var _ = require('underscore');
var packageJSON = JSON.parse(fs.readFileSync(__dirname + '/package.json'));

String.prototype.endsWith = function (str) {
	return this.substr(-str.length) === str;
};

program
	.version(packageJSON.version)
	.option('-i, --in [file]', 'File to compress.')
	.option('-o, --out [file]', 'File to write minified output to (optional).')
	.option('-p, --prepend [string]', 'Will prepend [string] to the output filename.')
	.option('-a, --append [string]', 'Will append [string] to the output filename, in front of the file extension.')
	.parse(process.argv);

if (! program.in) {
	console.log('no input file');
	shell.exit(-1);
}

// validate file type

if (! program.in.endsWith('.css') && ! program.in.endsWith('.js')) {
	console.log('invalid input file');
	shell.exit(-1);
}

if (! program.out) program.out = program.in;

// append to filename

if (program.append) {
	var paths = program.out.split('/');
	var filename = program.out.split('/').pop();
	var extension = _.last(filename.split('.'));
	var name = filename.replace('.' + extension, '');
	paths.pop();
	paths.push(name + program.append + '.' + extension);
	program.out = paths.join('/');
}

// prepend to filename

if (program.prepend) {
	var paths = program.out.split('/');
	var filename = program.out.split('/').pop();
	paths.pop();
	paths.push(program.prepend + filename);
	program.out = paths.join('/');
}

// add .min to filename

var split = program.out.split('.');
program.out = _.first(split) + '.min.' + _.last(split);

// done modifying filename

console.log(program.out);

if (program.in.endsWith('.css')) {
	var minify = require(__dirname + '/lib/css').minify;
}

if (program.in.endsWith('.js')) {
	var minify = require(__dirname + '/lib/js').minify;
}

minify(program.in, program.out);
console.log('saved ' + program.out);
