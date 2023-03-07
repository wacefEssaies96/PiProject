var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
require('dotenv').config();
// routers

const productRouter = require('./routes/e-commerce/e-commerce');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Routes
app.use('/api/admin/products', productRouter);

//connect to mongo database
mongoose.set('strictQuery', true);
mongoose.connect(
    process.env.MONGODB_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
if (process.env.NODE_ENV === 'production') {
  // Production error handling
  app.use((err, req, res, next) => {
    res.status(500).send('Something went wrong.');
  });
} else {
  // Development error handling
  app.use((err, req, res, next) => {
    res.status(500).send('Something went wrong.');

  });
}

module.exports = app;
