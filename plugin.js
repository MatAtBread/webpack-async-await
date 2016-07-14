//AsyncAwaitPlugin.js

var acornES7 = require('acorn-es7-plugin')(require("acorn")) ;


function AsyncAwaitPlugin(options) {
    if (!options)
        options = true ;
    this.parseAST = function parse(source, initialState) {
        var ast, lastError, acornOpts = {
            ranges: true,
            locations: true,
            ecmaVersion: 7,
            sourceType: "module",
            plugins:{
                asyncawait:options
            }
        };

        ['module','script'].some(function(sourceType) {
            acornOpts.sourceType = sourceType ;
            try {
                ast = acornES7.parse(source, acornOpts);
                return true ;
            } catch(e) {
                lastError = e ;
                return false ;
            }
        }) ;
        
        if(!ast) 
            throw lastError ;
        
        if(typeof ast !== "object")
            throw new Error("Source couldn't be parsed");
        var oldScope = this.scope;
        var oldState = this.state;
        this.scope = {
            inTry: false,
            definitions: [],
            renames: {}
        };
        var state = this.state = initialState || {};
        if(this.applyPluginsBailResult("program", ast) === undefined)
            this.walkStatements(ast.body);
        this.scope = oldScope;
        this.state = oldState;
        return state;
    } ;
};

AsyncAwaitPlugin.prototype.apply = function (compiler) {
    compiler.parser.parse = this.parseAST ;
};

module.exports = AsyncAwaitPlugin;
