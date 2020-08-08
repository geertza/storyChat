const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
var passportInit = passport.initialize()
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
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
var io = require('socket.io') (http)
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





io.use(function(socket, next){
  passportInit(socket.client.request, socket.client.request.res, next);
});



io.on('connection', function(socket){
  console.log('connection',socket.id)
  socket.emit('welcome')
  socket.on('join', () => {
      console.log('Client has joined');
  });

  socket.on('sendMessage', (message) => {
   console.log(message)
   socket.emit('message',message);
   socket.broadcast.emit('message',message);
  });
 

  socket.on('disconnect', () => {
    console.log('logut')
  // socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
  // socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    
  })
});
app.use(express.static(__dirname + '/node_modules'));

//Start Server
http.listen(3001, () => {
  console.log("Server Has Started 3001");
});