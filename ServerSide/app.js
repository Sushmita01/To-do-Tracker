var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');  // log requests to the console 
var cors = require('cors');
 
var indexRouter = require('./routes/index');
var toDoRouter = require('./routes/to-do');

const db=require("./db");



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));  //log every request to the console
app.use(express.json());    // parse application/json
app.use(express.urlencoded({ extended: false }));  // parse application/x-www-form-urlencoded
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));  // set the static files location
app.use(cors());

//setting the designated routers to the request urls 
app.use('/', indexRouter);
app.use('/ToDos', toDoRouter);


//connecting to db
db.connect((err)=> {
  if (err)  {
    console.log("Unable to connect to DB");
    process.exit(1);
  }
  else  {
    app.listen(3000, () => {
      console.log("Connected to Database!");
    })
  }
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
