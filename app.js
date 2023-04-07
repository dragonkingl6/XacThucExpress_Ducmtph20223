//var createError = require('http-errors');
var express = require('express');

var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');
const cookieParser = require('cookie-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var apiRouter = require('./routes/api');

var app = express();
const { requireAuth, checkUser } = require('./checkxacthuc/authMiddleware');
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.use('/users', usersRouter);

app.use('/api', apiRouter);
app.use('/api/signup', apiRouter);
app.use('/api/login', apiRouter);
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });

// var cors = require('cors')

// app.use(cors());

app.use(passport.initialize());


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('404 - Khong tim thay trang')
  next();
});

module.exports = app;

const port = 8080;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
