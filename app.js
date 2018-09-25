const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const fs = require('fs')
const path = require('path')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
// const fileUpload = require('express-fileupload');
const multer = require('multer');


// import routers
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const fileRouter = require('./routes/file');
const authRouter = require('./routes/auth');

const app = express();


app.locals.moment = require('moment');

// Database
const mysql = require('mysql');
const con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  port: 13306,
  password: '12345',
  database: 'users'
});

con.connect(function (err) {
  if (err) {
    console.log('connecting error');
    return;
  }
  console.log('connecting success');
});

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');

app.use(cors({
  origin: ['http://127.0.0.1:4000', 'http://localhost:3000'],
  credentials: true
}));

// use configs
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



// express session
app.set('trust proxy', 1)
app.use(session({
  secret: 'keyboard cat',
  cookie: { maxAge: 60000000000 },
}))


// setting middleware
app.use('/jquery', express.static(__dirname + '/Jquery'));

app.use(express.static(path.join(__dirname, 'src')));


// db state
app.use(function (req, res, next) {
  req.con = con;
  next();
});

app.use('/api', apiRouter);
app.use('/file', fileRouter);
app.use('/auth', authRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Node server
// Constants
const PORT = 4000;
const HOST = '127.0.0.1';

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, HOST);
}

console.log(`Running on http://${HOST}:${PORT}`);

module.exports = app;
