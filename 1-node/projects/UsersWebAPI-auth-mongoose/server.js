// BASE SETUP
// ======================================

// CALL THE PACKAGES --------------------
var express    = require('express');					// express fw
var app        = express();										// express app instance
var mongoose   = require('mongoose');					// MongoDB ODM
var User       = require('./app/models/user');	// mongoose model (returned from user.js)

var bodyParser = require('body-parser');			// extract request content
var morgan     = require('morgan');						// console log all requests

var port       = process.env.PORT || 8080;		  // set app port


// APP CONFIGURATION ---------------------
// use body parser so can grab info from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure app to handle  requests from other domains (CORS)
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

// log all requests to console
app.use(morgan('dev'));

// connect to db
mongoose.connect('mongodb://localhost:27017/test');

// ROUTES FOR OUR API
// ======================================

// basic route for home page
app.get('/', function(req, res) {
	res.send('Welcome to the home page!');
});


// Express Route instance (registered on '/api')
var apiRouter = express.Router();

// middleware to use for all requests
apiRouter.use(function(req, res, next) {
	// do logging
	console.log('Somebody just came to our app!');
	next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working
// accessed at GET http://localhost:port/api
apiRouter.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

// on routes that end in ../api/users
// ----------------------------------------------------
apiRouter.route('/users')

	// create user (new instance of the model) (accessed at POST http://localhost:port/api/users)
	.post(function(req, res) {

		var user = new User();		  // new instance of user mongoose model
		user.name = req.body.name;  // set users name (comes from request)
		user.username = req.body.username;  // set users username (comes from request)
		user.password = req.body.password;  // set users password (comes from request)

		user.save(function(err) {
			if (err) {
				// duplicate entry
				if (err.code == 11000)
					return res.json({ success: false, message: 'A user with that username already exists. '});
				else
					return res.send(err);
			}
			// return a message
			res.json({ message: 'User created!' });
		});

	})

	// get all users (accessed at GET http://localhost:port/api/users)
	.get(function(req, res) {
		User.find(function(err, users) {
			if (err) return res.send(err);

			// return the users
			res.json(users);
		});
	});

// on routes that end in ../api/users/:user_id
// ----------------------------------------------------
apiRouter.route('/users/:user_id')

	// get the user with that id
	.get(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err) return res.send(err);

			// return that user
			res.json(user);
		});
	})

	// update the user with this id
	.put(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {

			if (err) return res.send(err);

			// set the new user information if it exists in the request
			if (req.body.name) user.name = req.body.name;
			if (req.body.username) user.username = req.body.username;
			if (req.body.password) user.password = req.body.password;

			// save the user
			user.save(function(err) {
				if (err) return res.send(err);

				// return a message
				res.json({ message: 'User updated!' });
			});

		});
	})

	// delete the user with this id
	.delete(function(req, res) {
		User.remove({
			_id: req.params.user_id
		}, function(err, user) {
			if (err) return res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', apiRouter);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
