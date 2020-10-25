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
const userRouter = require('./Routes/FetchRoutes');
var http = require('http').Server(app);


// Middleware-------------------------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin:"http://localhost:" + process.env.PORT || 3000, // <-- location of the react app were connecting to
    credentials: true,
  })
);

app.use(cookieParser("secretcode"));

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);
app.use('/user',userRouter);
app.get("/chat", function(req, res){
  req.session // Session object in a normal request
});
app.use(
  session({
    secret: "game",
    resave: true,
    saveUninitialized: true,
  })
);
//----mongo-------------
// connect to mongodb through moongoose orm
mongoose.connect('process.env.DATABASE_URL || mongodb://localhost/datdevelo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
  },()=>{console.log('db connect');
});
app.use(require('morgan')('dev'));
var mongoStore = require('connect-mongo')(session);
//iiiii ooooooooooooooo-----------------------
//io auth
var io = require('socket.io') (http)
// var sessionMiddleware = session({
//   secret: 'game',
//   key: 'express.sid',
//   resave: true,
//   saveUninitialized: true,
//   store:new mongoStore({
//   mongooseConnection: mongoose.connection,
//   db: 'mydb'
//   })
// });

// app.use(sessionMiddleware);





io.use(function(socket, next){
  passportInit(socket.client.request, socket.client.request.res, next);
});


const { addUser, removeUser, getUser, getUsersInRoom } = require('./roomUsers');
io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({  name, room });

    if(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser();

    io.to(user.room).emit('message', { user: user.name, text: message });

  });

  socket.on('dom', function(data) {
    socket.emit('broadcast',{data});
 
  })
  
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
     
    }
  })

 

  socket.on('disconnect', () => {
  
  // socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
  // socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    
  })
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'));
  // server index.html if `/about` reached -> assets served through `express.static`
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, './client/build/index.html')));
}

app.use(express.static(__dirname + '/node_modules'));
//Start Server
http.listen(process.env.PORT|| 3001, () => {
  console.log("Server Has Started 3001");
}); 