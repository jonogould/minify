exports.output = function (file, app) {

	// node modules
	var fs = require('fs');
	// npm modules
	var shell = require('shelljs');
	var _ = require('underscore');
	var clc = require('cli-color');

	var output;

	// get the path without the filename
	var path = file.split('/');
	path.pop();
	path = path.join('/');

	// if output is specified, use it
	if (app.output) {
		try {
			var stat = fs.statSync(app.output);
			if (stat.isDirectory()) {
				path = app.output;
			} else {
				console.log(clc.red('ERROR') + ' specified output path is invalid');
				shell.exit(-1);
			}
		} catch (er) {
			console.log(clc.red('ERROR') + ' specified output path is invalid');
			shell.exit(-1);
		}
	}

	// get the filename, includes it's extension
	var filename = _.last(file.split('/'));

	// get the file extension
	var extension = _.last(filename.split('.'));

	// get the filename without its extension
	var name = filename.split('.');
	name.pop();

	// git commit hash
	if (app.hash) {
		var cmd = shell.exec("git log --pretty=format:'%h' -n 1", {silent:true});
		if (cmd.code !== 0) return;
		name = cmd.output + '.' + name;
	}

	if (path) path += '/';

	if (app.nomin && app.output) {
		output = path + name + '.' + extension;
	} else {
		output = path + name + '.min.' + extension;
	}

	return output;
}
