//local variables not visible outside module, only what is exported
var a = 1;
module.exports.a = a;
module.exports.b = 10;
module.exports.c = function() {
    console.log('called object method c');
};
