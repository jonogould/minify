### Install

```
git clone git@github.com:wayneashleyberry/minify.git
cd minify
npm install .
chmod +x minify.js
```

### Test

```
./minify.js --in test/test.js
SAVED test/test.min.js
./minify.js --in test/test.css -h
SAVED test/81d0628.test.min.css
```

### UglifyJS 2

As of 2012-10-10, the uglify-js2 npm module doesn't contain the minify object.
You have to clone the repo yourself.

```
cd minify/node_modules
rm -r uglify-js2
git clone https://github.com/mishoo/UglifyJS2.git uglify-js2
cd uglify-js2
npm install .
```

### Usage

Usage: minify.js [options]

Options:

	-h, --help              output usage information
	-V, --version           output the version number
	-i, --in [file]         File to compress.
	-o, --out [file]        File to write minified output to (optional).
	-p, --prepend [string]  Will prepend [string] to the output filename.
	-a, --append [string]   Will append [string] to the output filename, in front of the file extension.
	-h, --hash              Prepends the abbreviated git commit hash to the output filename.
	-H, --longhash          Prepends the full git commit hash to the output filename.
