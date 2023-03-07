var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose')
var cors = require('cors')
const bodyParser = require('body-parser');

require('dotenv').config();
//Routes Meals and auth
var mealRouter = require('./routes/Meals/mealRoutes');
var usersRouter = require('./routes/Users/userRoutes');
var authRouter = require('./routes/authentificationRoutes');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// routes SportTypes - SubTypes
var sportTypeRouter = require('./routes/Sports/sportTypeRoutes');
var sportSubTypeRouter = require('./routes/Sports/sportSubTypeRoutes');
// routers Articles and category-subcategory
var articleRouter = require('./routes/article/article');
var categoryRouter = require('./routes/article/category');
var subcategoryRouter = require('./routes/article/subcategory');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.enable('trust proxy');
app.use(bodyParser.json({type: '*/*'}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/api/sportTypes', sportTypeRouter);
app.use('/api/sportSubTypes', sportSubTypeRouter);
app.use('/api/users', usersRouter);
app.use('/api/meal', mealRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin/articles', articleRouter);
app.use('/api/admin/categories', categoryRouter);
app.use('/api/admin/subcategories', subcategoryRouter);

//connect to mongo database
mongoose.set('strictQuery', true);
mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
  console.log("Connected to the database! ");
}).catch(err => {
  console.log("Cannot connect to the database!", err);
  process.exit();
});

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

module.exports = app;
