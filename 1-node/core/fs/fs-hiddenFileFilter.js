
var fs = require('fs');

//retrieves files in dir, but also hidden files
src_files_raw = fs.readdirSync(__dirname + '/src');
console.log('src_files_raw');
console.log(src_files_raw);

//filter out those OS hidden files 
src_files = fs.readdirSync(__dirname + '/src').filter(isHiddenFile);
//or break into 2 steps
//src_files = src_files_raw.filter(isHiddenFile);

    //local fn - filters hidden OS X files
    function isHiddenFile(filename) {
      return (! /^\..*/.test(filename));
    };

console.log('src_files_filtered');
console.log(src_files_filtered);
