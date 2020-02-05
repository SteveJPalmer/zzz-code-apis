//local variables/methods not visible outside module, only what is exported
var a = 1;
module.exports = function(app) {
    console.log('exporting a function! with parameter(s):' + app);
};
