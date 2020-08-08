import React, { useState, useEffect } from "react";

import io from "socket.io-client";

import TextContainer from './TextContainer/TextContainer';
import Messages from './Messages/Messages';
import InfoBar from './InfoBar/InfoBar';
import Input from './Input/Input';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
  // const [name, setName] = useState('');
  // const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'http://localhost:3001';

  useEffect(() => {
    const name = 'andy'
    const room ='lobby'

    socket = io(ENDPOINT);
 socket.on('message', message => {
   console.log('talk=',message)
      // setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
    
    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
      console.log(message)
    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
          {/* <InfoBar room={room} /> */}
          <Messages messages={messages} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;
