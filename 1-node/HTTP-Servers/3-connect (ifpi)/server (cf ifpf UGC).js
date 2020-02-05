//Web server to serve out index.html
var connect = require('connect');
var serveStatic = require('serve-static');

var serve = serveStatic("C:/zzz_Library/2 - Web/2 - Mean & Frameworks/Reference Code/IFPI - UserGeneratedContent - latestRelease",
                        { 'setHeaders': setHeaders } )

connect().use(serve).listen(8081);

function setHeaders(res, path) {
   res.setHeader('Access-Control-Allow-Origin', "*")
   res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
}
