const express = require('express');
const app = express.Router();
const passport = require('passport');
// const passportConfig = require('../passport');

const User = require('../models/user');
// Routes
app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) {
        res.status(401);
      res.send("No User Exists");
      }
      else { 
        req.logIn(user,res, (err) => {
           console.dir('here',user,res);
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
  app.route('/status').get((req, res) => {
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
      res.status(200).json({ user: req.user })
    } else {
      res.status(200).json({
        user: {
          access_id: 0,
          type: 'Guest',
          user_id: 0,
          username: 'guest'
        }
      })
    }
  })
  module.exports = app;