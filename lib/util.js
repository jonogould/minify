exports.output = function (file, app) {

	var shell = require('shelljs');
	var _ = require('underscore');
	var output;

	// get the path without the filename
	var path = file.split('/');
	path.pop();
	path = path.join('/');

	// if output is specified, use it
	if (app.output) path = app.output;

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

	output = path + name + '.min.' + extension;

	return output;
}
