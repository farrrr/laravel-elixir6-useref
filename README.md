# Laravel-Elixir6-Useref
>This is a simple wrapper around Laravel Elixir v6 for Useref. inspire by [laravel-elixir-useref](https://github.com/morrislaptop/laravel-elixir-useref)



## Getting Started
Install the module with [npm](https://npmjs.org) or [yarn](https://yarnpkg.com/):

yarn
```bash
$ yarn add laravel-elixir6-useref
```
or

npm
```bash
$ npm install --save laravel-elixir6-useref
```


And add it to your Elixir-enhanced Gulpfile, like so:

```javascript
var elixir = require('laravel-elixir');

require('laravel-elixir6-useref');

elixir(function(mix) {
   mix.useref([
       'layouts/construct.blade.php',
       'app/app.blade.php'
   ]);
});
```

Then you just have to edit your php file(s) and some extra markup, like this:

```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">

    <!-- build:css(public) css/all.css -->
    <link rel="stylesheet" href="bower_components/dropzone/dist/min/dropzone.min.css" />
    <link rel="stylesheet" href="css/app.css" />
    <!-- endbuild -->
</head>
<body>
    <!-- build:js(public) js/all.js -->
    <script src="bower_components/dropzone/dist/min/dropzone.min.js"></script>
    <script src="js/main.js"></script>
    <!-- endbuild -->
</body>
</html>
```

This will scan your asset dependencies in your `app.blade.php`, concat and minimise those files and put them in your public directory as `css/all.css` and `js/all.js` (you can change the name in the tag if you like).

This tool is really powerful if you use [laravel-elixir-wiredep](https://github.com/FabioAntunes/laravel-elixir-wiredep) to inject your assets in:

    @if ( Config::get('app.debug') )
        <!-- build:css(public) css/all.css -->
        <!-- bower:css -->
        <!-- endbower -->
        <!-- endbuild -->
    @else
        <link rel="stylesheet" href="{{ elixir("css/all.css") }}">
    @endif

Note: It will not replace the assets in your app.blade.php - you should check if you are in production / debug mode and output your compiled assets or your source assets:

    @if ( Config::get('app.debug') )
        <!-- build:js(public) js/all.js -->
        <script src="bower_components/jquery/dist/jquery.js"></script>
        <script src="js/main.js"></script>
        <!-- endbuild -->
    @else
        <script src="{{ elixir("js/all.js") }}"></script>
    @endif

## Options
This wrapper accepts two objects for configuration, the first one is for the wrapper itself and the second one is for useref ([documentation](https://github.com/jonkemp/gulp-useref))

## Example
This is an example of a Gulp file that runs wiredep to inject all our assets and then uses useref (searching in the public directory) to compile all the assets in `master.blade.php` :

```javascript
var elixir = require('laravel-elixir');
require('laravel-elixir6-useref');

elixir(function(mix) {
    mix
      .wiredep()
      .useref('master.blade.php', null, null, { searchPath: 'public' });
});
```
