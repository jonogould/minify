exports.minify = function (i, o, root) {
	var shell = require('shelljs');
	var cmd = 'java -jar ' + root + '/bin/htmlcompressor-1.5.3.jar ' + i + ' -o ' + o + ' --preserve-php';
	shell.exec(cmd);
}
