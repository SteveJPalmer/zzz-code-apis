// load the express package and create our app
var express = require('express');
var app     = express();
const port = 3000;

// send our index.html file to the user for the home page
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

// send hello message
app.get('/hello', (req, res) => {
	res.send('Hello World!')
})

// start the server
app.listen(port);

console.log(`Example app listening at http://localhost:${port}`)

// or
/*
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
*/

