Minify
=======

Minify is a simple command-line wrapper that can minify almost anything.

Listed below are the supported filetypes and what's actually used to minify them.

- javascript [uglify-js2](https://github.com/mishoo/UglifyJS2)
- css [r.js](https://github.com/jrburke/r.js/)
- php [htmlcompressor](http://code.google.com/p/htmlcompressor/)
- html [htmlcompressor](http://code.google.com/p/htmlcompressor/)
- png [pngcrush](http://pmt.sourceforge.net/pngcrush/)
- jpeg [jpegtran](http://jpegclub.org/jpegtran/)

Defaults for image compression were inspired by [Yahoo](http://developer.yahoo.com/performance/rules.html#opt_images)

### Installation

```
git clone git@github.com:wayneashleyberry/minify.git
cd minify
chmod +x minify.js
npm install .
```

### Dependencies

```
brew install jpeg-turbo pngcrush
brew link jpeg-turbo
```

### Usage

Usage: ``` minify.js [file] [options] ```

```
Options:

-h, --help             output usage information
-V, --version          output the version number
-o, --output [path]    specify an output path (optional)
-g, --git-hash         prepends the abbreviated git commit hash to the output filename
-c, --content-hash     prepends an abbreviated hash based on the minified output
-a, --append [string]  append a custom string to the output filename [.min]
-v, --verbose          write verbose output
```

Optimize a single file

	./minify.js test/test.css

Optimize all files

	./minify.js test/*

Optimize all javascript files, appending content hashes

	./minify.js src/**/*.js --content-hash --output dist 
