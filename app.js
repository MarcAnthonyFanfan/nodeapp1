var http = require('http');
var mysql = require('mysql');

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World\n');
}).listen(8080);

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

console.log('Server started');