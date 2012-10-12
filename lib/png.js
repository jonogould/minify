exports.minify = function (i, o, root) {
	var shell = require('shelljs');
	var cmd = 'pngcrush -rem alla -reduce -brute '+i+' '+o;
	shell.exec(cmd);
}
