
```
git clone git@github.com:wayneashleyberry/minify.git
cd minify
chmod +x minify.js
npm install .
sudo npm install -g requirejs uglify-js2
```

Usage: minify.js [options]

Options:

	-h, --help        output usage information
	-V, --version     output the version number
	-i, --in [file]   file to compress
	-o, --out [file]  file to write output to (optional)

if no output file is specified the input name will be used
foo.css will become foo.min.css etc
