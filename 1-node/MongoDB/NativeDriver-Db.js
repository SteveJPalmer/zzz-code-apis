/* name:  basicNativeDriver.js
   descr: basic Native MongoDB driver code for nodejs
*/
var mongo = require('mongodb'),
  dbHost = '127.0.0.1',
  dbPort = 27017;

//prepare connection to MongoDB server
var Db = mongo.Db;
var Connection = mongo.Connection;
var Server = mongo.Server;
var db = new Db ('migrationTest', new Server(dbHost, dbPort), {safe:true});

//open connection
db.open(function(error, dbConnection){
  if (error) {
    //check connection success
    console.error(error);
    process.exit(1);
  }
  console.log('db state: ', db._state);
  
  //prepare next article
  article = {
    name: 'Steve'
  }
  
  //insert article into collection
  dbConnection.collection('articles').insert(article, function(error, article){
    if (error) {
      console.error(error);
      process.exit(1);
    }

    console.info("inserted: ", article);
    db.close();
    process.exit(0);
  });

});
