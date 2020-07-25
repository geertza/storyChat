const express = require('express');
const path = require('path');
const { Socket } = require('dgram');
const app = express();
const PORT = process.env.PORT || 3001;
require ('dotenv').config();
// api routes are loaded first before 'catch-all'
const todos = ['dummy todo', 'another dummy todo'];

// app.get('/todos', (req, res) => {
//   res.json(todos);
// });

// app.post('/new/todo', (req, res) => {
//   todos.push('new todo');
//   res.json(todos);
// });
var id = 0
const server = require('http').createServer(app);
const io = require('socket.io').listen(55550);
io.on('connection', (socket) => {
  setInterval(function (){
    socket.emit('gamechange',(id))
  },2000);
  console.log('Socket',id++) });

// serve static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'));
  // server index.html if `/about` reached -> assets served through `express.static`
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, './client/build/index.html')));
}

app.listen(PORT, () => console.log('App running on PORT: ' + PORT));
