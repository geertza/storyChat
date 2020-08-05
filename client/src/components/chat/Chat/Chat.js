import React, { useState, useEffect } from "react";
// import { SocketProvider } from 'socket.io-react';

import io from 'socket.io-client';
var socket  ;
// import TextContainer from '../TextContainer/TextContainer';
// import Messages from '../Messages/Messages';
// import InfoBar from '../InfoBar/InfoBar';
// import Input from '../Input/Input';
// import AuthService from '../../../authorize/AuthService';
// import './Chat.css';



//  = ({ location }) => {
//   const [name, setName] = useState('');
//   const [room, setRoom] = useState('');
//   const [users, setUsers] = useState('');
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
  

  // function Chat({ response }) {
  //       socket = io('localHost:3001');
  //       let room = 1
  //       useEffect(() => {
  //       socket.emit('join', { UserName, room}, (error) => {
  //         if(error) {
  //           alert(error);
  //         }
  //       });
  //     }, )

  //   const [isFetching, setFetching] = useState(false);
  //   const [UserName,setUserName] = useState([]);
  //   const [isAuthenticated,setIsAuthenticated] = useState([]);
  //   useEffect(function fetch() {
  //     (async function() {
  //       setFetching(true);
  //     await AuthService.isAuthenticated(response).then(data =>{
  //         console.log(data)
  //         setUserName(data.username);
  //         setIsAuthenticated(data.isAuthenticated);
  //     });
  //       setFetching(false);
  //     })();
  //   }, [response]);
    
  //   if (isFetching) {
  //     return <div>loading page</div>;
  //   }
  //   // let player = JSON.parse(User)
  //   console.log('user',UserName)
  //   if (isAuthenticated){
  //      return  ChatFinal(UserName);
  //   }else{
  //   return <div>please log in</div>}
    
  // }
  
  
  function Chat(){
    const [name, setName] = useState('');
    const [msg, setMsg] = useState('');
    const [msg2, setMsg2] = useState('');
    const [message, setMessage] = useState('');
    
      var user;
    socket= io('localHost:3001')
    var user;
    socket.on('userExists', function(data) {
       setMsg(data);
    });
    
      function sendMessage() {
         
         if(msg) {
            socket.emit('msg', {message: msg, user: {Username}});
         }
      }
      socket.on('newmsg', function(data) {
         if(user) {
            document.getElementById('message-container').innerHTML += '<div><b>' + 
              setMessage(data.user + '</b>: ' + data.message + '</div>')
         }
      })
      const Username = e =>{
       console.log({name})
       //   socket.emit('setUsername', {name}.value);
      };  
  return (
    <div className="outerContainer">
      <div>{msg}</div>
      <div className="container">
          hello chat
          {/* <Messages messages={messages} name={name} /> */}
          {/* <Input message={message} setMessage={setMessage} sendMessage={sendMessage} /> */}
      </div>
      {/* <TextContainer users={userName}/> */}
    </div>
  );
}

export default Chat;
