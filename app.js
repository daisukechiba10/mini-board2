var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var validator = require('express-validator');
var logger = require("morgan");

var index = require('./routes/index');
var users = require('./routes/users');
var home = require('./routes/home');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(validator());

var session_opt ={
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 }
};
app.use(session(session_opt));

app.use('/users', users);
app.use('/', index)
app.use('/home', home);

// catch 404 and forward to error handler
app.use((req, res, next) => {});

// error handler
app.use((err, req, res, next) => {});
 
module.exports = app;
