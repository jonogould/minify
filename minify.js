#!/usr/bin/env node

var fs = require('fs');
var program = require('commander');
var shell = require('shelljs');
var _ = require('underscore');
var packageJSON = JSON.parse(fs.readFileSync(__dirname + '/package.json'));
var clc = require('cli-color');

String.prototype.endsWith = function (str) {
	return this.substr(-str.length) === str;
};

program
	.version(packageJSON.version)
	.option('-i, --in [file]', 'File to compress.')
	.option('-o, --out [file]', 'File to write minified output to (optional).')
	.option('-p, --prepend [string]', 'Will prepend [string] to the output filename.')
	.option('-a, --append [string]', 'Will append [string] to the output filename, in front of the file extension.')
	.option('-g, --gitcommit', 'Prepends the abbreviated git commit hash to the output filename.')
	.option('-G, --fullgitcommit', 'Prepends the full git commit hash to the output filename.')
	.parse(process.argv);

if (! program.in && process.argv.length > 2) {
	program.in = process.argv[2];
}

if (! program.in) {
	console.log('no input file');
	shell.exit(-1);
}

var output;

// path to file
var path = program.in.split('/');
path.pop();
path = path.join('/');

// full filename
var filename = _.last(program.in.split('/'));

// file extension
var extension = _.last(filename.split('.'));

// filename without the extension
var name = filename.split('.');
name.pop();

// validate file type

var supported = ['js', 'css', 'html', 'php'];

if (! _.contains(supported, extension)) {
	console.log('invalid input file');
	shell.exit(-1);
}

if (! program.out) program.out = program.in;

function append(str) {
	name = name + str;
}

function prepend(str) {
	name = str + name;
}

// append to filename

if (program.append) {
	append(program.append);
}

// prepend to filename

if (program.prepend) {
	prepend(program.prepend);
}

// git commit hash

if (program.gitcommit && ! program.fullgitcommit) {
	var cmd = shell.exec("git log --pretty=format:'%h' -n 1", {silent:true});
	if (cmd.code !== 0) return;
	prepend(cmd.output + '.');
}

if (program.fullgitcommit) {
	var cmd = shell.exec("git log --pretty=format:'%H' -n 1", {silent:true});
	if (cmd.code !== 0) return;
	prepend(cmd.output + '.');
}

// done modifying filename

var minify = require(__dirname + '/lib/' + extension).minify;

if (path) path += '/';

var output = path + name + '.min.' + extension;

minify(program.in, output, __dirname);

var lines = 'SAVED ' + output;
// console.log(lines.replace(/./gi, '='));
console.log(clc.green('SAVED ') + output);
