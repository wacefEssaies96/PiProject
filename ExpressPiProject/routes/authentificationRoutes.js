var express = require('express');
var router = express.Router();
const Authentication = require('../controllers/authentication');
const passport = require('passport');
require('../services/passport');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

const requireAuth = passport.authenticate('jwt', {
  session: false
});
const requireSignIn = passport.authenticate('local', {
  session: false
});


// Hello endpoint
router.get('/api', function (req, res) {
  res.send('Express Server with JWT Authentication');
});

// Validate user
router.get('/validate', requireAuth, function (req, res) {
  res.send({
    user: req.user.email
  });
});


// Login user
router.post('/login', requireSignIn, Authentication.signin);

// Register user
router.post('/register', upload.single('image'), Authentication.signup);

// router.get('/test', Authentication.requireRole("USER"), (req, res) => {
//   res.json({ message: 'Hello Admin ' + req.user });
// });
//two factor authentication
//router.post('/send-otp',Authentication.sendOTP);
//router.post('/verify-otp',Authentication.verifyOTP);





module.exports = router;
