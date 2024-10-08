const router = require("express").Router();
const passport = require("passport");
const User = require('../models/Users/user')
require('../services/googlepassport');

/* GET Google Authentication API. */
router.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
	"/auth/google/callback",
	passport.authenticate("google", { failureRedirect: "/", session: false }),
	async function (req, res) {
		var token = req.user.token;
		var user = req.user;
		let response = await User.findOne({ email: user.email });
		if (response === null) {
			const u = new User({
				fullname: user.name,
				email: user.email,
				role: 'USER'
			});
			user = await u.save()
			res.redirect("http://localhost:3000?token=" + token + '&name=' + user.name + '&email=' + user.email + '&id=' + user._id);
		} else {
			res.redirect("http://localhost:3000?token=" + token + '&name=' + response.name + '&email=' + response.email + '&id=' + response._id);
		}
	}
);

require('../services/linkedinpassport');

router.get(
	"/auth/linkedin",
	passport.authenticate("linkedin", { scope: ["r_emailaddress", "r_liteprofile"] })
);

router.get(
	"/auth/linkedin/callback",
	passport.authenticate("linkedin", { failureRedirect: "/", session: false }),
	async function (req, res) {
		var token = req.user.token;
		var user = req.user;
		let response = await User.findOne({ email: user.email });
		if (response === null) {
			const u = new User({
				fullname: user.name,
				email: user.email,
				role: 'USER'
			});
			user = await u.save()
			console.log(user.email);
			res.redirect("http://localhost:3000?token=" + token + '&name=' + user.name + '&email=' + user.email + '&id=' + user._id);
		} else {
			console.log(response.email);
			res.redirect("http://localhost:3000?token=" + token + '&name=' + response.name + '&email=' + response.email + '&id=' + response._id);
		}
	}
);
module.exports = router;
