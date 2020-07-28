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


// //-------io socket----
// var id = 0
// const server = require('http').createServer(app);
// const io = require('socket.io').listen(55550);
// const passportJwtSocketIo = require('passport-jwt.socketio')



// io.on('connection', (socket) => {
  
//   console.log('Socket',id++) });

// serve static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/'));
  // server index.html if `/about` reached -> assets served through `express.static`
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, './client/build/index.html')));
}

app.listen(PORT, () => console.log('App running on PORT: ' + PORT));
