mochavar app = require('./server');
var assert = require('assert');
var superagent = require('superagent');

describe('server', function() {
  var server;

  beforeEach(function() {
    server = app().listen(3000);
  });

  afterEach(function() {
    server.close();
  });

  it('prints out "Hello, world" when user goes to /', function(done) {
    superagent.get('http://localhost:3000/', function(error, res) {    //returns the response
      assert.ifError(error);
      assert.equal(res.status, 200);            //check status
      assert.equal(res.text, "Hello, world!");  //check response
      done();
    });
  });
});
