var io = require('socket.io').listen(app);
 
require('socketio-auth')(io, {
  authenticate: authenticate,
  postAuthenticate: postAuthenticate,
  disconnect: disconnect,
  timeout: 1000
});

io.use(passportSocketIo.authorize({
    cookieParser: cookieParser,       // the same middleware you registrer in express
    key:          'express.sid',       // the name of the cookie where express/connect stores its session_id
    secret:       'game',    // the session_secret to parse the cookie
    store:        sessionStore,        // we NEED to use a sessionstore. no memorystore please
    success:      onAuthorizeSuccess,  // *optional* callback on success - read more below
    fail:         onAuthorizeFail,     // *optional* callback on fail/error - read more below
  }));
  function authenticate(socket, data, callback) {
    var username = data.username;
    var password = data.password;
   
    db.findUser('User', {username:username}, function(err, user) {
      if (err || !user) return callback(new Error("User not found"));
      return callback(null, user.password == password);
    });
  }
  function postAuthenticate(socket, data) {
    var username = data.username;
   
    db.findUser('User', {username:username}, function(err, user) {
      socket.client.user = user;
    });
  }
  function disconnect(socket) {
    console.log(socket.id + ' disconnected');
  }

  module.exports = io;