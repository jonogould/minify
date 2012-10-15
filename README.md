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

As of 2012-10-10, the uglify-js2 npm module doesn't contain the minify object.
You have to clone the repo yourself.

```
cd minify/node_modules
rm -r uglify-js2
git clone https://github.com/mishoo/UglifyJS2.git uglify-js2
cd uglify-js2
npm install .
```

### Dependencies

```
brew install jpeg-turbo pngcrush
brew link jpeg-turbo
```

### Usage

Usage: ``` minify.js [file] [options] ```

Options:

    -h, --help             output usage information
    -v, --version          output the version number
    -o, --output [path]    specify an output path (optional)
    -g, --git-hash         prepends the abbreviated git commit hash to the output filename
    -c, --content-hash     prepends an abbreviated hash based on the minified output
    -a, --append [string]  append a custom string to the output filename [.min]
    --nophp                skip php files
    --nohtml               skip html files
    --nocss                skip css files
    --nojs                 skip javascript files
    --nopng                skip png files
    --nojpeg               skip jpeg/jpg files
    --noimages             skip images

Optimize a single file

	./minify.js test/test.css

Optimize all files

	./minify.js test/*

Optimize an entire project, skipping php and appending content hashes

	./minify.js src/**/** --content-hash --nophp --output dist 
