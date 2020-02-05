
var MongoClient = require('mongodb').MongoClient
         , test = require('assert');
MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {

  //ref collection
  var collection = db.collection('people');

  //update document (atomic op)
  collection.updateOne({name:'Bill Clinton'}, {$set:{name:'Bill Clinton2'}});
});
