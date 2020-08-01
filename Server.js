const express = require('express');
const path = require('path');
const { Socket } = require('dgram');
const app = express();
const PORT = process.env.PORT || 3001;
require ('dotenv').config();
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// body parser to express
app.use(express.json());
// encryption key
app.use(cookieParser());

// connect to mongodb through moongoose orm
mongoose.connect('mongodb://localhost/dat2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
  },()=>{console.log('db connect');
});
app.use('/user',userRouter);


//-------io socket----
app.use(cors());
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// const { disconnect } = require('process');

io.on('connect', (socket) => {
  socket.on('join', ({ name }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });


  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

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




app.use(require('morgan')('dev'));

//access socket.io
app.use(express.static(__dirname + '/node_modules'));

app.use(express.static(__dirname + '/public'));
app.get('/',function(req,res,next){
  res.sendFile(__dirname + '/index.html');
})
// // serve static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('./build'));
//   // server index.html if `/about` reached -> assets served through `express.static`
//   app.get('*', (req, res) => res.sendFile(path.join(__dirname, './build/index.html')));
// }
app.listen(PORT, () => console.log('App running on PORT: ' + PORT));
