### Install

```
brew install jpeg-turbo pngcrush
brew link jpeg-turbo
git clone git@github.com:wayneashleyberry/minify.git
cd minify
chmod +x minify.js
npm install .
```

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
	-n, --nomin          don't add .min to the output, requires an output path to be set
	--nophp              skip php files
	--nohtml             skip html files
	--nocss              skip css files
	--nojs               skip javascript files
	--nopng              skip png files
	--nojpeg             skip jpeg/jpg files
	--noimages           skip images

optimize a single file

	./minify.js test/test.css

optimize all files

	./minify.js test/*

optimize an entire project

	./minify.js src/**/** --nomin --noimages --nophp --output dist --hash
