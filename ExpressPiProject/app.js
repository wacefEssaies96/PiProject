var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

require('dotenv').config();
<<<<<<< Updated upstream
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

=======
// routers
var articleRouter = require('./routes/article/article');
var categoryRouter = require('./routes/article/category');
var subcategoryRouter = require('./routes/article/subcategory');
const productRouter = require('./routes/e-commerce/e-commerce');
>>>>>>> Stashed changes
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

<<<<<<< Updated upstream
app.use('/', indexRouter);
app.use('/users', usersRouter);

=======
app.use('/api/admin/articles', articleRouter);
app.use('/api/admin/categories', categoryRouter);
app.use('/api/admin/subcategories', subcategoryRouter);
app.use('/api/admin/products', productRouter);
>>>>>>> Stashed changes
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
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
