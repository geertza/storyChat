const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const User = require("./models/user");
const userRouter = require('./routes/FetchRoutes');
var http = require('http').Server(app);
//----------------------------------------- END OF IMPORTS---------------------------------------------------
//----mongo-------------
// connect to mongodb through moongoose orm
mongoose.connect('mongodb://localhost/datdevel', {
  useNewUrlParser: true,
  useUnifiedTopology: true
  },()=>{console.log('db connect');
});
app.use(require('morgan')('dev'));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(
  session({
    secret: "game",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./Config/passport")(passport);
app.use('/user',userRouter);
//Start Server
http.listen(3001, () => {
  console.log("Server Has Started 3001");
});