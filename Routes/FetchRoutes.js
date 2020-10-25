const express = require("express");
const app = express.Router();
const passport = require("passport");
const search = require("../api/BingSearch");
const bcrypt = require("bcrypt")
// const passportConfig = require('../passport');

const User = require("../models/user");
// Routes
app.post("/login", (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) throw err;
		if (!user) {
			res.status(401);
			res.send("No User Exists");
		} else {
			req.logIn(user, res, (err) => {
				console.dir("here", user, res);
				if (err) throw err;
				res.status(200);
				res.send("Successfully Authenticated");
			});
		}
	})(req, res, next);
});
app.post("/register", (req, res) => {
	User.findOne({ username: req.body.username }, async (err, doc) => {
		if (err) throw err;
		if (doc) res.send("User Already Exists");
		if (!doc) {
			const hashedPassword = await bcrypt.hash(req.body.password, 10);

			const newUser = new User({
				username: req.body.username,
				password: hashedPassword,
			});
			await newUser.save();
			res.send("User Created");
		}
	});
});
app.get("/bing/:id/:option",async (req, res) => {
	console.log('query = ',req.params.id)
	console.log('char',req.params.option)
	let image = req.params.id;
	let option = req.params.option;
	// console.log(image,option)
	return res.json((await search(image,option)).data)
});
module.exports = app;
