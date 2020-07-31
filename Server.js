const express = require('express');
const path = require('path');
const { Socket } = require('dgram');
const app = express();
const PORT = process.env.PORT || 3001;
require ('dotenv').config();
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const cookieParser = require('cookie-parser');
// body parser to express
app.use(express.json());
// encryption key
app.use(cookieParser());
// connect to mongodb through moongoose orm
mongoose.connect('mongodb://localhost/dat', {
  useNewUrlParser: true,
  useUnifiedTopology: true
  },()=>{console.log('db connect');
});
app.use('/user',userRouter);


//-------io socket----
var id = 0
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const passportJwtSocketIo = require('passport-jwt.socketio')

io.on('connection', function(client){
  //join log
  client.on('join',function(){
    console.log(`client ${client.id} has joined`);
  })

  //if there is a message..
  client.on('message', function(message){
    //repeat to everyone
    client.broadcast.emit('broad',message);
    client.emit('broad',message);
  })
}); 

// serve static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/'));
  // server index.html if `/about` reached -> assets served through `express.static`
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, './client/build/index.html')));
}

app.use(require('morgan')('dev'));

//access socket.io
app.use(express.static(__dirname + '/node_modules'));

app.use(express.static(__dirname + '/public'));
app.get('/',function(req,res,next){
  res.sendFile(__dirname + '/public/index.html');
})

app.listen(PORT, () => console.log('App running on PORT: ' + PORT));
