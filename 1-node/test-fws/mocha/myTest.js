var assert = require('assert');

describe('my feature', function() {           //Test Suite
  it('works', function() {                      //single test
    assert.equal('A', 'A');                     //(will use default message)
  });

  it('should fail', function() {							  //single test
  assert.equal(1, 0, '1 should equal 1'); 		    //(can set msg prop as 3rd param, else uses default msg)
  });

  it('fails gracefully', function() {           //single test
    assert.throws(function() {
      throw 'Error!';
    });
  });
});

describe('my other feature', function() {    //Test Suite
  it('async', function(done) {                 //single test
    setTimeout(function() {
      done();
    }, 25);
  });
});
