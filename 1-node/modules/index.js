
/* Note:  if specify file, looks for specific file
          if just specify name, looks in node_modules
          if specify directory, looks in that dir for index.js */

/* Note:  convention is not to add .js (is assumed) */

//returns a fn
var myFn = require('./myFn');
myFn('test');                               //(optionally pass in params)
//or
var myFn2 = require('./myFn')('test');    //require, then runs (optional params)


//returns an Obj
var myObj = require('./myObj');
console.log(myObj);
console.log(myObj.a);
myObj.c();


//returns a fn - from index.js in directory (aka ./basicDir/index.js)
var myFn2 = require('./basicDir');
myFn2();

//nested module exports (for complex codebase) - returns a fn (aka ./myDir/index.js > myOtherFile.js)
var myOtherFn = require('./complexDir').getFn3;
myOtherFn();
