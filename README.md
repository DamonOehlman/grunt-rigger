# grunt-rigger

This is a [grunt](https://github.com/gruntjs/grunt) plugin for the [buildJS](https://github.com/buildjs) tool [rigger](https://github.com/buildjs/rigger). 

Rigger provides targetted include functionality (similar to [sprockets](https://github.com/sstephenson/sprockets)) but with some additional functionality.  A highlight of rigger functionality is outlined below:

- Simple include format for including files using a special comment syntax (`//= foo.js`)
- Ability to include remote resources as well as local: (`http://github.com/buildjs/shims/string/trim.js`)
- Ability to intelligently transpile from [coffee-script](https://coffeescript.org), [stylus](http://learnboost.github.com/stylus/), etc to their natural web equivalents (js, css, etc).

## Usage

To use `grunt-rigger` you will need to include it in your `package.json` file (I'd recommend under the `devDependencies` section):

```json
{
  "name": "myproject",
  "devDependencies": {
    "coffee-script": "1.3.x",
    "grunt-rigger": "0.4.x"
  },
}
```

You will see in the example above, `coffee-script` is also included in the `devDependencies` section.  In cases where you would like to leverage riggers ability to transpile files (e.g. `.coffee` => `.js`) you will need to include the appropriate node package in your `devDependencies` as these are not automatically included in rigger itself (to avoid library bloat).

Using `grunt-rigger` within grunt itself is very simple.  Consider the following sample `grunt.js` file:

```js
module.exports = function(grunt) {
    grunt.initConfig({
        rig: {
            compile: {        
                options: {
                    banner: '/* THIS BANNER USES TEMPLATE FUNCTIONALITY <%= banner_property %> */\n',
                    footer: '\n/* SOME FOOTER */'
                },
                files: {
                    'dist/simple.js': ['src/simple.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-rigger');
};
```

That should be pretty much it, if your source file contains any [rigger](https://github.com/buildjs/rigger) comments they will be parsed and executed accordingly.