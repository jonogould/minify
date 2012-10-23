not appending anything to the filename causes the output filename to be identical as the input,
which shouldn't be allowed

```
minify main.css --append ''
```

common use case is as when you want to use content hashes,
which are added post minification

```
minify main.css --append '' --content-hash
```
