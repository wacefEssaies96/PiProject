var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
var http = require('http');
require('dotenv').config();

var mongoose = require('mongoose');
var cors = require('cors');

require('dotenv').config();
var VerifyImgRouter = require('./routes/Img/VerifyImgRouter');
//Routes Meals and auth
var mealRouter = require('./routes/Meals/mealRoutes');
var recipeRouter = require('./routes/Recipe/recipeRoutes');
var usersRouter = require('./routes/Users/userRoutes');
var authRouter = require('./routes/authentificationRoutes');
// routes SportTypes - SubTypes - SportSubTypesTitlesScraped
var sportTypeRouter = require('./routes/Sports/sportTypeRoutes');
var sportSubTypeRouter = require('./routes/Sports/sportSubTypeRoutes');
var sportSubTypeTitlesScrapedRouter = require('./routes/Sports/sprotSubTypesTitlesScrapedRouter');
// routers Articles and category-subcategory
var articleRouter = require('./routes/article/article');
var commentRouter = require('./routes/article/comment');
var notificationRouter = require('./routes/article/notification');
var categoryRouter = require('./routes/article/category');
var subcategoryRouter = require('./routes/article/subcategory');
// routes Clinics
var ClinicRouter = require('./routes/apointments/clinicroutes');
//routes appointments
var appointmentRouter = require('./routes/apointments/appointmentroutes')
//routes userapp
var UserappointmentRouter = require('./routes/apointments/appuserroutes')
// routes e-commerce
const productRouter = require('./routes/e-commerce/e-commerce');

const orderRouter = require('./routes/e-commerce/Order');
//send email route 
var resetPassword = require('./routes/resetPasswordRoute')
// morphology route
const morphologyRoute = require('./routes/Sports/getYourMorphologyRouter')
// const otherAppsAuthRouter = require("./routes/otherappsauth");
const otherAppsAuthRouter = require("./routes/otherappsauth");


var app = express();

app.use(cors());
app.enable('trust proxy');
// app.use(bodyParser.json({type: '*/*'}));

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
// app.use(passport.session());

//Routes
app.use('/api/notifications', notificationRouter);
app.use('/api/comment', commentRouter);
app.use('/api/admin/products', productRouter);
app.use('/api/admin/orders', orderRouter);
app.use('/', otherAppsAuthRouter);
app.use('/api/sportTypes', sportTypeRouter);
app.use('/api/sportSubTypes', sportSubTypeRouter);
app.use('/api/users', usersRouter);
app.use('/api/Img', VerifyImgRouter);
app.use('/api/meal', mealRouter);
app.use('/api/recipe', recipeRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin/articles', articleRouter);
app.use('/api/admin/categories', categoryRouter);
app.use('/api/admin/subcategories', subcategoryRouter);
app.use('/uploads', express.static('uploads'));
app.use('/api/clinic', ClinicRouter);
app.use('/api/app', appointmentRouter);
app.use('/api/appuser', UserappointmentRouter);
app.use('/api', resetPassword);
app.use('/api/sportSubTypes/uploads', express.static('uploads/SportSubTypesDemVideos'))
app.use('/api/scrapedSportSubTypesTitles', sportSubTypeTitlesScrapedRouter)
app.use('/api/get-your-morphology', morphologyRoute)

//connect to mongo database
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database! ');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ error: err });
});

app.set('port', 3030);
var server = http.createServer(app);
server.listen(3030);
const { io } = require("./utils/socketjs");
io.attach(server);
module.exports = app;
