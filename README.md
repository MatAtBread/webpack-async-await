# webpack-async-await

IMPORTANT
=========

Whereas this plugin does indeed allow Webpack to parse and not fail on the keywords async and await, it DOES NOT produce runnable output. Specifically, it loses the 'async' attribute in an `export async function x() { ..... }` and fails to map the identifer(s) within an `await` expression in code such as:

	import {a} from './async' ;
	await a() ; // FAILS!
	
	var b = a ;
	await b() ; // Works

This is basically because I didn't spend enough time working out how webpack works. The plugin needs to (at least) retain the async attribute in https://github.com/webpack/webpack/blob/master/lib/dependencies/HarmonyExportImportedSpecifierDependency.js#L58 and https://github.com/webpack/webpack/blob/master/lib/dependencies/HarmonyExportSpecifierDependency.js#L42, before even starting to work on the import identifier mapping for await statements.


Read me
=======

A plugin for webpack understands the ES7 keywords `async` and `await`, making building code for Chrome 53, Edge 14 and other 
ES7-capable platforms simple.

Usage:

```

var webpack = require('webpack');
var AsyncAwaitPlugin = require('webpack-async-await') ;

var options = { } ; // See https://github.com/MatAtBread/acorn-es7-plugin#options--compliance

webpack({
    plugins: [
      new AsyncAwaitPlugin(options)
    ],
    
    ...
}).run(function(err,stats){
    ...
});

```

Further details on the available options can be found at https://github.com/MatAtBread/acorn-es7-plugin#options--compliance
