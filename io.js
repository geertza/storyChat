// Socket IO------------------
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

// encryption key


// app.use('/user',userRouter);
// body parser to express


//----mongo-------------
// connect to mongodb through moongoose orm
mongoose.connect('mongodb://localhost/datdevel', {
  useNewUrlParser: true,
  useUnifiedTopology: true
  },()=>{console.log('db connect');
});
app.use(require('morgan')('dev'));
//-------io socket----


// const { disconnect } = require('process');

io.on('connect', (socket) => {
  console.log('socket on',socket.id)
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

//   // socket.on('disconnect', () => {
//   //   const user = removeUser(socket.id);

//     if(user) {
//       io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
//       io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
//     }
//   })
// });
io.on('connection', function(socket) {
  console.log('A user connected');
  socket.on('setUsername', function(data) {
     console.log('setusername',data);
     
     if(users.indexOf(data) > -1) {
        socket.emit('userExists', data + ' username is taken! Try some other username.');
     } else {
        users.push(data);
        socket.emit('userSet', {username: data});
     }
  })});
  
  socket.on('msg', function(data) {
     //Send message to everyone
     console.log("new mess",data)
     io.sockets.emit('newmsg', data);
  })
});
// //io auth
// io.use(passportSocketIo.authorize({
//   cookieParser: cookieParser,       // the same middleware you registrer in express
//   key:          'express.sid',       // the name of the cookie where express/connect stores its session_id
//   secret:       'game',    // the session_secret to parse the cookie
//   store:        sessionStore,        // we NEED to use a sessionstore. no memorystore please
//   success:      onAuthorizeSuccess,  // *optional* callback on success - read more below
//   fail:         onAuthorizeFail,     // *optional* callback on fail/error - read more below
// }));




//access socket.io




// // serve static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('./build'));
//   // server index.html if `/about` reached -> assets served through `express.static`
//   app.get('*', (req, res) => res.sendFile(path.join(__dirname, './build/index.html')));
// }
// app.listen(PORT, () => console.log('App running on PORT: ' + PORT));