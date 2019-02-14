import React, {Component} from 'react';
import Message from './Message.jsx';

// A list of all messages. Imports a constructor Message React component, and appends it to a list
function MessageList ({ messages }) {
  const messageList = messages.map(msg => (
    <Message key = {msg.id} username={msg.username} message = {msg.content} />
  ));
  return (
    <main className="messages">
      {messageList} 
      <div className="message system">
      </div>
    </main>
    );
  }
  export default MessageList;