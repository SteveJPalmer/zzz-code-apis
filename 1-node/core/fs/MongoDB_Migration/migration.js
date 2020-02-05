/* Name:  migration.js
   Descr: Data 'load' into new cms system.
          File loaded from src folder, moved to processed folder when successfully loaded
          Data 'extracted' via existing apple news feed (single file per article)
*/
//process timing
var start = Date.now();            //start time(ms)
 
var mongo = require('mongodb'),    //mongo native driver
    dbHost = '127.0.0.1',
    dbPort = 27017;

var fs = require('fs'),            //core file system module
    src = '/src/',
    processed = '/processed/';

//prepare connection to MongoDB server
var Db = mongo.Db;
var Connection = mongo.Connection;
var Server = mongo.Server;
var db = new Db ('migrationTest', new Server(dbHost, dbPort), {safe:true});

// open connection
db.open(function(error, dbConnection){
  if (error) {
    //check connection success
    console.error(error);
    process.exit(1);
  }
  console.log('connected to database: ' + db.databaseName);

  //retrieve a list of source files to load
  src_files = fs.readdirSync(__dirname + src).filter(isHiddenFile);
  // src_files_raw = fs.readdirSync(__dirname + '/src');
  // console.log('src_files_raw');
  // console.log(src_files_raw);

  // src_files = src_files_raw.filter(isHiddenFile);
  // console.log('src_files_filtered');
  // console.log(src_files);

    //local fn - filters hidden OS X files
    function isHiddenFile(filename) {
      return (! /^\..*/.test(filename));
    };

  //grab some stats
  src_count = src_files.length;
  console.log('Number of source files :' + src_count);
  if (src_count == 0) {
    console.log('No files to processs');
    process.exit(1);
  }
  //console.log(src_files);

  //process each file ===========================================================
  for (idx = 0; idx < src_count; idx++) {
    console.log( '..Loading File: ' + src_files[idx] + ' (' + (idx+1) + ' of ' + src_count + ')');

    //read file and parse to json
    filename = __dirname + src + src_files[idx];

    file = fs.readFileSync(filename, {"encoding":"utf8"});
    //file = fs.readFileSync(filename, 'utf8');
    article = JSON.parse(file);
    //console.log(article);


    /*
       Transformation/Mapping to new cms model section
       tbc...
    */


    //insert document into MongoDb collection
    dbConnection.collection('articles').insert(article, function(error, article){
      if (error) {
        console.error(error);
        process.exit(1);
      }
    });

    //move file into processed folder
    fs.renameSync(__dirname + src + src_files[idx],
                  __dirname + processed + src_files[idx]);
  }; //for ========================================================================

  //exit successfully
  //db.close();
  console.log('Completed successfully');
  var stop = Date.now();           //stop time(ms)
  var duration = stop - start;     //duration(ms)
  console.log('process duration(sec): ' + duration/1000);
  process.exit(0);
});
