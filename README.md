### Install

```
git clone git@github.com:wayneashleyberry/minify.git
cd minify
npm install .
chmod +x minify.js
```

### Usage

```
./minify.js test/test.js
./minify.js test/*.css
./minify.js test/**
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

	-h, --help           output usage information
	-V, --version        output the version number
	-o, --output [path]  specify an output path (optional).
	-h, --hash           prepends the abbreviated git commit hash to the output filename.
