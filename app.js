let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');
let config = require('./config/config');

let bodyParser = require('body-parser');
let passport = require('passport');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let regRouter = require('./routes/register');
let app = express();
let server = require('http').Server(app);

// load mongoose
mongoose.Promise = global.Promise;
mongoose.connect(config.urlDatabase, { useNewUrlParser: true }).then(() => { 
  console.log('Server is Ready');
}).catch((err) => console.log('Gagal Mongodb is Offlane. Server Error'));
// view engine setup

app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', regRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(passport.initialize());
require('./config/passport')(passport);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
