not appending anything to the filename causes the output filename to be identical as the input

example:
```
minify main.css --append ''
```

that's obviously a big problem.

common use case is as when you want to use content hashes,
which are added post minification

example:
```
minify main.css --append '' --content-hash
```
