import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import AuthService from '../../../authorize/AuthService';
import './Chat.css';

let socket;

//  = ({ location }) => {
//   const [name, setName] = useState('');
//   const [room, setRoom] = useState('');
//   const [users, setUsers] = useState('');
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
  const ENDPOINT = 'http://localhost:3001/';

  function Chat({ response }) {
    const [isFetching, setFetching] = useState(false);
    const [User, setUser] = useState([]);
    const [UserName,setUserName] = useState([]);
    const [isAuthenticated,setIsAuthenticated] = useState([]);
    useEffect(function fetch() {
      (async function() {
        setFetching(true);
        setUser(await AuthService.isAuthenticated(response).then(data =>{
          console.log(data)
          setUserName(data.username);
          setIsAuthenticated(data.isAuthenticated);
      }));
        setFetching(false);
      })();
    }, [response]);
    
    if (isFetching) {
      return <div>Fetching page</div>;
    }
    // let player = JSON.parse(User)
    console.log('user',{UserName},UserName)
    if (isAuthenticated){
        return ChatFinal();
    }else{
    return <div>piss off I'm busy</div>}
    
  }
  
  
  
  
  
  
  function ChatFinal(){
  // useEffect(() => {
   
    
    
 

  // //   socket.emit('join', { UserName }, (error) => {
  // //     if(error) {
  // //       alert(error);
  // //     }
  // //   });
  
  //  })
  // useEffect(() => {
  //   socket.on('message', message => {
  //     setMessages(messages => [ ...messages, message ]);
  //   });
    
//     socket.on("user", ({ users }) => {
//       setUsers(users);
//     });
// }, []);

  // const sendMessage = (event) => {
  //   event.preventDefault();

  //   if(message) {
  //     socket.emit('sendMessage', message, () => setMessage(''));
  //   }
  // }

  return (
    <div className="outerContainer">
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
