### Install

```
git clone git@github.com:wayneashleyberry/minify.git
cd minify
npm install .
chmod +x minify.js
./minify.js test/test.js
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

Usage Options:

```
-h, --help              output usage information
-V, --version           output the version number
-i, --in [file]         File to compress.
-o, --out [file]        File to write minified output to (optional).
-p, --prepend [string]  Will prepend [string] to the output filename.
-a, --append [string]   Will append [string] to the output filename, in front of the file extension.
```
