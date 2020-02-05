/* console instance */
//as obj is global, can use without require(‘console’)
var a = 'value a', b = 'value b', name = 'Steve';

console.log('test substitution %s and %s. ',a,b);   //test substitition value a and value b.
console.log('test concat parmas',a,b);              //test concat parmas value a value b
console.error(new Error('Whoops, error!'))      //[Error: Whoops, error!]
//noinspection JSAnnotator
console.warn(`Danger ${name} ! Danger!`);       //Danger Steve ! Danger!

//Util also has log with timestamp
require('util').log('log %s message.',name);    //10 Apr 15:59:52 - log message.


/* console class */
var fs = require('fs');
const Console = require('console').Console;
//or, const Console = console.Console;

//simple logger (creates files if don't exist)
const out = fs.createWriteStream('./myOutFile.log');
const err = fs.createWriteStream('./myErrFile.log');
const logger = new Console(out, err);
//then use like console
var count = 5;
logger.log('count: %d', count);         //myOutFile.log >count 5
logger.error('Whoops, another one!');   //myErrFile.log >Whoops, another one!
//subsequent logs get concats...
//restarting script overwrites...
