exports.minify = function (i, o, app) {
	var shell = require('shelljs');
	var cmd = 'java -jar ' + app.__dirname + '/bin/htmlcompressor-1.5.3.jar ' + i + ' -o ' + o + ' --preserve-php';
	shell.exec(cmd);
}
