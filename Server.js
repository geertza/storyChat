const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
var passportInit = passport.initialize()
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
// const redis = require('redis')
// let RedisStore = require('connect-redis')(session)
const bodyParser = require("body-parser");
const app = express();
const User = require("./models/user");
const userRouter = require('./routes/FetchRoutes');
var http = require('http').Server(app);

//----mongo-------------
// connect to mongodb through moongoose orm
mongoose.connect('mongodb://localhost/datdevel', {
  useNewUrlParser: true,
  useUnifiedTopology: true
  },()=>{console.log('db connect');
});
app.use(require('morgan')('dev'));
var mongoStore = require('connect-mongo')(session);
// Middleware-------------------------------------------------------
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
app.get("/chat", function(req, res){
  req.session // Session object in a normal request
});
//iiiii ooooooooooooooo-----------------------
//io auth
var io = require('socket.io');
var sessionMiddleware = session({
  secret: 'secretcode',
  key: 'express.sid',
  resave: true,
  httpOnly: true,
  secure: true,
  ephemeral: true,
  saveUninitialized: true,
  cookie: {},
  store:new mongoStore({
  mongooseConnection: mongoose.connection,
  db: 'mydb'
  })
});

app.use(sessionMiddleware);
io = io(http);
io.use(function(socket, next){
  socket.client.request.originalUrl = socket.client.request.url;
  cookieParser(socket.client.request, socket.client.request.res, next);
});

io.use(function(socket, next){
  socket.client.request.originalUrl = socket.client.request.url;
  sessionMiddleware(socket.client.request,   socket.client.request.res, next);
});

io.use(function(socket, next){
  passportInit(socket.client.request, socket.client.request.res, next);
});

io.use(function(socket, next){
  passportSession(socket.client.request, socket.client.request.res, next);
});

io.on('connection', function(socket){
  
});






//Start Server
http.listen(3001, () => {
  console.log("Server Has Started 3001");
});