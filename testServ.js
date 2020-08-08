const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");


// const cookieParser = require("cookie-parser");


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
// var mongoStore = require('connect-mongo')(session);
// Middleware-------------------------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);

// app.use(cookieParser("secretcode"));


app.use('/user',userRouter);
app.get("/chat", function(req, res){
  req.session // Session object in a normal request
});


//iiiii ooooooooooooooo-----------------------
//io auth
var io = require('socket.io');
// var sessionMiddleware = session({
//   secret: 'secretcode',
//   key: 'express.sid',
//   resave: true,
//   httpOnly: true,
//   secure: true,
//   ephemeral: true,
//   saveUninitialized: true,
//   cookie: {},
//   store:new mongoStore({
//   mongooseConnection: mongoose.connection,
//   db: 'mydb'
//   })
// });

// app.use(sessionMiddleware);
io = io(http);
io.use(function(socket, next){
  socket.client.request.originalUrl = socket.client.request.url;
//   cookieParser(socket.client.request, socket.client.request.res, next);
});






io.on('connect', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
      const { error, user } = addUser({ id: socket.id, name, room });
        console.log('joined room',name)
      if(error) return callback(error);
  
      socket.join(user.room);
  
      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
  
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
  
      callback();
    });
  
    socket.on('sendMessage', (message, callback) => {
    //   const user = getUser(socket.id);
            console.log('message sent')
    //   io.to().emit('message', { user: user.name, text: message });
  
      callback();
    });
  
    socket.on('disconnect', () => {
      const user = removeUser(socket.id);
  
      if(user) {
        io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
      }
    })
  });






//Start Server
http.listen(3001, () => {
  console.log("Server Has Started 3001");
});