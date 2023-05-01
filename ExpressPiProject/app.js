var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
require('dotenv').config();

var mongoose = require('mongoose');
var cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();
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
// body shapes scraped routes
const BodyShapesScrapedRouter = require("./routes/Sports/bodyShapesScrapedRouter")
// sport youtube videos scraped routes
const SportVideosScrapedRouter = require("./routes/Sports/sportVideosScrapedRouter")
// sport events calendar sport routes
const EventCalendarSportRouter = require("./routes/Sports/EventCalendarSportRouter")
// sport notification routes
const sportNotificationRouter = require("./routes/Sports/sendSportNotificationRouter")
// sport ratings routes
const sportRatingRouter = require("./routes/Sports/RatingSportRouter")
// sport progress routes
const sportPprogressRouter = require("./routes/Sports/ProgressSportRouter")

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
app.use('/api/admin/products', productRouter);
app.use('/api/admin/orders', orderRouter);
// app.use("/li", linkedInAuthRouter);
app.use('/', otherAppsAuthRouter);
app.use('/api/sportTypes', sportTypeRouter);
app.use('/api/sportSubTypes', sportSubTypeRouter);
app.use('/api/users', usersRouter);
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
app.use('/api/store', BodyShapesScrapedRouter)
app.use('/api/scrapedYoutubeVideos', SportVideosScrapedRouter)
app.use('/api/eventCalendarSport', EventCalendarSportRouter)
app.use('/api/sportsNotif', sportNotificationRouter)
app.use('/api/sportsRating', sportRatingRouter)
app.use('/api/sportsProgress', sportPprogressRouter)

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

module.exports = app;
