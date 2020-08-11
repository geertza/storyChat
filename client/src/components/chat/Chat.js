  
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
// import io from "socket.io-client";


import Messages from './Messages/Messages';
import InfoBar from './InfoBar/InfoBar';
import Input from './Input/Input';
// import auth from '../../authorize/AuthService'
import './Chat.css';

let socket;

const Chat = ({ location }) => {
  // const [name, setName] = useState('');
  // const [room, setRoom] = useState('');
  // const [users, setUsers] = useState('');
  // const [message, setMessage] = useState('');
  // const [messages, setMessages] = useState([]);
  // const ENDPOINT = 'http://localhost:3001';


    // socket = io(ENDPOINT);
//  socket.on('message', message => {
//   //  console.log('talk=',message)
//       setMessages(messages => [ ...messages, message ]);
//     });
    
//     socket.on("roomData", ({ users }) => {
//       setUsers(users);
//     });
    
   
 

//   const sendMessage = (event) => {
//     event.preventDefault();
//       console.log(message)
//     if(message) {
//       socket.emit('sendMessage', message, () => setMessage(''));
//       setMessage('')
//     }
//   }

  return (
    <div className="chatContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      
    </div>
  );
}

export default Chat;