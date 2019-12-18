// express setup
var express = require('express');
var cookieParser = require('cookie-parser');
var sha256 = require('js-sha256');
var app = express();
var port = 8080;
app.set('view engine', 'pug');
app.use(express.urlencoded());
app.use(cookieParser());

// mysql setup
var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'node',
    database: 'nodeapp'
});
con.connect(function(err) {
    if (err) throw err;
    console.log('Connected to DB');
});

// app route: /
app.get('/', function(req, res) {
    var ip = req.connection.remoteAddress;
    console.log(`ip=${ip} method=GET route=/`);
    if(req.cookies.session_key) {
        con.query(`SELECT * FROM sessions WHERE session_key='${req.cookies.session_key}'`, function(err, result, fields) {
            if(err) throw err;
            if(result.length == 0) {
                console.log(`ip=${ip} event=BAD_SESSION_KEY session_key=${req.cookies.session_key} redirect=/logout`);
                res.redirect('logout');
            }
            else {
                con.query(`SELECT * FROM users WHERE id='${result[0].user_id}'`, function(err, result, fields) {
                    if(err) throw err;
                    if(result.length == 0) {
                        console.log(`ip=${ip} event=BAD_SESSION_USER session_key=${req.cookies.session_key} redirect=/logout`);
                        res.redirect('logout');
                    }
                    else {
                        console.log(`ip=${ip} event=USER_AUTHENTICATED_WITH_SESSION_KEY username=${result[0].username} session_key=${req.cookies.session_key}`);
                        res.render('index', { title: 'Node.js', message: 'Hello, ' + result[0].username });
                    }
                })
            }
        });
    }
    else {
        console.log(`ip=${ip} event=NO_SESSION_KEY_FOUND redirect=/login`);
        res.redirect('/login');
    }
});

// app route: /login
app.get('/login', function(req, res) {
    var ip = req.connection.remoteAddress;
    console.log(`ip=${ip} method=GET route=/login`);
    if(req.cookies.session_key) {
        console.log(`ip=${ip} event=SESSION_KEY_FOUND redirect=/`);
        res.redirect('/');
    }
    else {
        res.render('login');
    }
});
app.post('/login', function(req, res) {
    var ip = req.connection.remoteAddress;
    console.log(`ip=${ip} method=POST route=/login`);
    var username = req.body.username;
    var password = req.body.password;
    var secure_password = sha256(username.toLowerCase()+password).substring(0, 32);
    con.query(`SELECT * FROM users WHERE username='${username}' AND password='${secure_password}'`, function(err, result, fields) {
        if(err) throw err;
        var username_from_db = result[0].username;
        if(result.length == 0) {
            console.log(`ip=${ip} event=BAD_LOGIN_ATTEMPT username=${username}`);
            res.render('login', { flash_message: 'Incorrect Username/Password', username: username, autofocus_password: 'autofocus' });
        }
        else if(result.length == 1) {
            con.query(`DELETE FROM sessions WHERE user_id='${result[0].id}'`, function(err, result, fields) {
                if(err) throw err;
            });
            var session_key = sha256(username.toLowerCase()+password+ip).substring(0, 32);
            con.query(`INSERT INTO sessions(user_id, session_key) VALUES('${result[0].id}', '${session_key}')`, function(err, result, fields) {
                if(err) throw err;
                res.cookie('session_key' , session_key);
                // res.cookie('session_key' , session_key, { secure: true});
                console.log(`ip=${ip} event=CREATED_NEW_USER_SESSION username=${username_from_db} session_key=${req.cookies.session_key} redirect=/`);
                res.redirect('/');
            });
        }
    });
});

// app route: /signup
app.get('/signup', function(req, res) {
    var ip = req.connection.remoteAddress;
    console.log(`ip=${ip} method=GET route=/signup`);
    res.render('signup');
});
app.post('/signup', function(req, res) {
    var ip = req.connection.remoteAddress;
    console.log(`ip=${ip} method=POST route=/signup`);
    var username = req.body.username;
    var password = req.body.password;
    var password_confirmation = req.body.password_confirmation;
    if(password == password_confirmation) {
        var secure_password = sha256(username.toLowerCase()+password).substring(0, 32);
        con.query(`INSERT INTO users(username, password) VALUES('${username}', '${secure_password}')`, function(err, result, fields) {
            if(err) throw err;
            con.query(`SELECT * FROM users WHERE username='${username}' AND password='${secure_password}'`, function(err, result, fields) {
                var session_key = sha256(username.toLowerCase()+password+ip).substring(0, 32);
                con.query(`INSERT INTO sessions(user_id, session_key) VALUES('${result[0].id}', '${session_key}')`, function(err, result, fields) {
                    if(err) throw err;
                    res.cookie('session_key' , session_key);
                    // res.cookie('session_key' , session_key, { secure: true});
                    console.log(`ip=${ip} event=CREATED_NEW_USER_SESSION username=${result[0].username} session_key=${req.cookies.session_key} redirect=/`);
                    res.redirect('/');
                });
            });
        });
    }
    else {
        console.log(`ip=${ip} event=PASSWORD_CONFIRMATION_MISMATCH`);
        res.render('signup', { flash_message: 'Password and Confirmation do not match', username: username, autofocus_password: 'autofocus' });
    }
});

// app route: /logout
app.get('/logout', function(req, res) {
    var ip = req.connection.remoteAddress;
    console.log(`ip=${ip} method=GET route=/logout`);
    res.clearCookie('session_key');
    console.log(`ip=${ip} event=CLEARED_SESSION_KEY_COOKIE session_key=${req.cookies.session_key} redirect=/`);
    res.redirect('/login');
});

// start app
app.listen(port, '0.0.0.0');
console.log(`Node app listening on port ${port}!`);