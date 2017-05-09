# gluex
*glue your stuff together*

> GLUEX is a tool to glue multiple HTML, JavaScript or JSON files (or other file types) together. It lets you use selectors to only pick a certain tag from a HTML document or a certain property from a JSON. Furthermore it allows the usage of namespaces, for example to distinguish between a development and a productive scenario. It could be used as a CLI tool as well as a module in your code.

## Installation
as a command line tool

```
npm install gluex -g
```

as a module

```
npm install gluex --save
```

## Usage

GLUEX uses inline comment-based directives to determine which files you'd like to glue.

### In a JavaScript file
``` JS
// @gluex path/to/file.js
```
or 
``` JS
/* @gluex path/to/file.js */
```

### In a HTML file
``` HTML
<!-- @gluex path/to/file.html -->
```

### invoke as a CLI tool

to glue just once:

	gluex -i path/to/input.xx -o path/to/output.xx

to watch files for changes:

	gluex -i path/to/input.xx -o path/to/output.xx -w

When watching, GLUEX will automatically watch any referenced files for changes too, and recompile the output file upon any changes to reference files.

### invoke as a module

``` JS 
var gluex = require("gluex"),

inputPath = "path/to/input.xx",
outputPath = "path/to/output.xx",
namespace = null,
watch = true,

gluex(inputPath, outputPath, namespace, watch);
```
    
if you omit the `outputPath` the glued file gets returned by the function like so...
``` JS 
var output = gluex(inputPath);
```

## Advanced Usage
### Namespaces

``` HTML
<body>
<!-- gluex path/to/dev_only.html -->
<!-- gluex:dev path/to/dev_only.html -->
</body>
```

When calling gluex with the namespace `dev` the first directive will be replaced with an empty string (deleted) and only the second one will be replaced with the content of the refernced file. Calling with no namespace will replace the first one and remove the second one. This works the same for JS. You can pass a namespace like so:

#### CLI
    gluex -i path/to/input.xx -o path/to/output.xx -n dev

#### Module
``` JS
gluex('path/to/input.xx', 'path/to/output.xx', 'dev');
```

### Selectors
``` HTML
<head>
    <title><!-- gluex path/to/package.json (.name) --></title>
</head>
<body>
<!-- gluex path/to/partials.html (#someID) -->
</body>
```

For JSON and HTML includes you can put a selectors behind the filename (in brackets). For a JSON file the selector has to be a property path. For a HTML file you can use any CSS selector. 

## License
**MIT License**

Copyright (c) 2017 Stefan Keim (indus)
