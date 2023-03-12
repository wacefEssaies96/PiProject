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
			await u.save()
		}
		res.redirect("http://localhost:3000?token=" + token + '&name=' + user.name + '&email=' + user.email);
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
		const token = req.user.token
		res.redirect("http://localhost:3000?token="+ token + '&name=' + req.user.name );
	}
);
module.exports = router;
