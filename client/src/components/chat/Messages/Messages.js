import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Draggable from 'react-draggable';
import Container from '@material-ui/core/Container';
import Message from './Message/Message';
import './Messages.css';

const Messages = ({ messages, name,setMessage, sendMessage, message }) => (
  <React.Fragment>
  <CssBaseline />
  <Draggable>
      <Container width="lg">
 <ScrollToBottom className="messages">
    {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
  </ScrollToBottom>
  </Container>
  </Draggable>
    </React.Fragment>
);

export default Messages;