// load express package & create our app
var express = require('express');
var app     = express();

// set  port
var port    = 1337;

// STATIC Files
// ======================================

// ERROR Handler
// ======================================


// ROUTES
// ======================================
  // basic technique of defining routes right on our app
  // basic GET route for home page
  app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
  });

  // basic POST route for home page
  app.post('/', function (req, res) {
    res.send('POST request to the homepage..');
  });

  // basic GET route for contact page
  app.get('/contact', function(req, res) {
    res.send('GET request to Contact Page..');
  });

  // basic routes method - combines for same url
  app.route('/login')
    // show the form (GET http://localhost:1337/login)
    .get(function(req, res) {
       res.send('this is the login form');
     })
    // process the form (POST http://localhost:1337/login)
    .post(function(req, res) {
       console.log('processing');
       res.send('processing the login form!');
     });

  // Router object
  // create routes for admin section
  // get an instance of the router
  var adminRouter = express.Router();

  // Middleware Routes - will happen on every /admin request
  adminRouter.use(function(req, res, next) {
    // log each request to console (node console, not browser!)
    console.log(req.method, req.url);
    // proceed with next piece of middleware or continue onto routing
    next();
  });

  // Middleware Validate Parameters (validate :name)
  adminRouter.param('name', function(req, res, next, name) {
    // do validation
    //validation code...
    // log
    console.log('doing name validations on ' + name);
    // once validation done, save new item in req
    req.name = name;
    // proceed with next piece of middleware or continue onto routing
    next();
  });


  // page /admin
  adminRouter.get('/', function(req, res) {
    res.send('I am main admin page!');
  });

  // page /admin/users
  adminRouter.get('/users', function(req, res) {
    res.send('I show all the users!');
  });

  // route with parameters (page http://localhost:1337/admin/users/steve)
  adminRouter.get('/users/:name', function(req, res) {
    res.send('hello ' + req.params.name + '!');
    // res.send('hello ' + req.name + '!');     //if name param changes in validation
  });

  // apply the routes to our app
  app.use('/admin', adminRouter);


// start the server
app.listen(port);
console.log('1337 is the magic port!');
