// express setup
var express = require('express');
var app = express();
var port = 8080;
app.set('view engine', 'pug')

// mysql setup
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "node"
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to DB");
});

// app route: /
app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!' });
});

// start app
app.listen(port, () => console.log(`Node app listening on port ${port}!`));