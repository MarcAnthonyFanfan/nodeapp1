// express setup
var express = require('express');
var app = express();
var port = 8080;
app.set('view engine', 'pug')

// mysql setup
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "node",
    database: "nodeapp"
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to DB");
});

// app route: /
app.get('/', function (req, res) {
    con.query("SELECT * FROM users", function (err, result, fields) {
        // if any error while executing above query, throw error
        if (err) throw err;
        // if there is no error, you have the result
        console.log(result)
        res.render('index', { title: "Node.js", message: "Hello, " + result[0].username });
    });
});

// start app
app.listen(port, () => console.log(`Node app listening on port ${port}!`));