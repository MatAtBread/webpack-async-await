var fs = require('fs');
var webpack = require('webpack');
var AsyncAwaitPlugin = require('..') ;
require('colors') ;

webpack({
    plugins: [
      new AsyncAwaitPlugin({
          awaitAnywhere:true,
          asyncExits:true
      })
    ],
    entry: __dirname+'/test-input.js',
    output: {
      path: __dirname,
      filename: 'test-output.js'
    }
}).run(function(err,stats){
    if (err) {
        console.log(err.toString().red);
    } else {
        if ((fs.readFileSync(__dirname+'/test-output.js').toString().indexOf(fs.readFileSync(__dirname+'/test-input.js').toString())) > 0) {
            console.log('Pass'.green) ;
        } else {
            console.log('Failed'.red) ;
        }
    }
});
