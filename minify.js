#!/usr/bin/env node

var fs = require('fs');
var program = require('commander');
var shell = require('shelljs');
var common = require(__dirname + '/lib/common');
var packageJSON = JSON.parse(fs.readFileSync(__dirname + '/package.json'));

String.prototype.endsWith = function (str) {
	return this.substr(-str.length) === str;
};

program
	.version(packageJSON.version)
	.option('-i, --in [file]', 'file to compress')
	.option('-o, --out [file]', 'file to write output to (optional)')
	.parse(process.argv);

if (! program.in) {
	console.log('no input file');
	shell.exit(-1);
}

if (! program.in.endsWith('.css') && ! program.in.endsWith('.js')) {
	console.log('invalid input file');
	shell.exit(-1);
}

if (! program.out) {
	program.out = common.createFileName(program.in);
}

if (program.in.endsWith('.css')) {
	var minify = require(__dirname + '/lib/css').minify;
}

if (program.in.endsWith('.js')) {
	var minify = require(__dirname + '/lib/js').minify;
}

minify(program.in, program.out);
