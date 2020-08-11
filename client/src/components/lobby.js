import React, { useState, useEffect } from "react";
// import Chat from './Chat/Chat'
// import BottomAppBar from "./lobbyBar"
import queryString from 'query-string';
import { TableSortLabel } from "@material-ui/core";
import io from "socket.io-client";
import Input from './Chat/Input/Input';
import Messages from './Chat/Messages/Messages';
import InfoBar from './Chat/InfoBar/InfoBar';
let socket;
const Lobby = ({ location }) => {

  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'http://localhost:3001';
  // const [name, setName] = useState('');
  const [Room, setRoom] = useState('');
 
  socket = io(ENDPOINT);
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);  
      setRoom(room)
  console.log({name},room)
  socket.emit('join',  {name,room}, (error) => {
    
    if(error) {
      alert(error);
    }
  });

}, [location.search]);
socket.on('message', message => {
  //  console.log('talk=',message)
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
    
   
 

  const sendMessage = (event) => {
    event.preventDefault();
      console.log(message)
    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
      setMessage('')
    }
  }
      return(
      <div>
       
       <InfoBar room={Room}></InfoBar>       
       <Messages messages={messages} message={message} setMessage={setMessage} sendMessage={sendMessage}        />
       
       {/* <Input  />      */}
       {/* <BottomAppBar /> */}
      </div>
       ) ;
      
  }
  export default Lobby