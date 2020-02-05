var mongodb = require('mongodb');

var uri = 'mongodb://localhost:27017/example';
mongodb.MongoClient.connect(uri, function(error, db) {
  //check if connection success
  if (error) {
    console.log(error);
    process.exit(1);
  }
  //CRUD code nested within connect callback
  db.collection('sample').insert({ x: 1 }, function(error, result) {
    if (error) {
      console.log(error);
      process.exit(1);
    }
    //retrieve all documents (driver returns cursor, toArray convenience method)
    db.collection('sample').find().toArray(function(error, docs) {
      if (error) {
        console.log(error);
        process.exit(1);
      }

      console.log('Found docs:');
      docs.forEach(function(doc) {
        console.log(JSON.stringify(doc));
      });
      process.exit(0);
    });
  });  //insert
});  //connect