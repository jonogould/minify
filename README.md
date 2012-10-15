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

Usage: ``` minify.js test/test.css [options] ```

Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -o, --output [path]    specify an output path (optional).
    -g, --git-hash         prepends the abbreviated git commit hash to the output filename.
    -c, --content-hash     prepends an abbreviated hash based on the minified output.
    -a, --append [string]  append a custom string to the output filename.
    --nophp                skip php files
    --nohtml               skip html files
    --nocss                skip css files
    --nojs                 skip javascript files
    --nopng                skip png files
    --nojpeg               skip jpeg/jpg files
    --noimages             skip images

optimize a single file

	./minify.js test/test.css

optimize all files

	./minify.js test/*

optimize an entire project

	./minify.js src/**/** --git-hash --nophp --output dist 
