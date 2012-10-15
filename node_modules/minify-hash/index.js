// core modules
var fs = require('fs');
var crypto = require('crypto');

// npm modules
var shell = require('shelljs');
var _ = require('underscore');

// hash function
// 1. read file from disk
// 2. create a sha1 hash based on file contents
// 3. return modified path
exports.hash = function (path) {

	var output;

	// get file contents
	var contents = shell.cat(path);

	// create new hash
	var shasum = crypto.createHash('sha1');

	// update hash based on file contents
	shasum.update(contents);
	hash = shasum.digest('hex').substr(0, 7);

	var arr = path.split('/');
	var filename = _.last(arr);

	arr.pop();
	arr.push(hash + '.' + filename);

	return arr.join('/');
};
