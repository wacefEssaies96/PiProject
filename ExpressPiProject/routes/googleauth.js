const router = require("express").Router();
const passport = require("passport");
require('../services/googlepassport');

/* GET Google Authentication API. */
router.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
	"/auth/google/callback",
	passport.authenticate("google", { failureRedirect: "/", session: false }),
	function (req, res) {
		var token = req.user.token;
		res.redirect("http://localhost:3000?token=" + token + '&name=' + req.user.name + '&email=' + req.user.email);
	}
);
module.exports = router;
