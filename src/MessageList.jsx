import React, {Component} from 'react';
import Message from './Message.jsx';

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
  

  // {
  //   type: "incomingMessage",
  //   content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
  //   username: "Anonymous2"
  // },
  // {
  //   type: "incomingMessage",
  //   content: "...",
  //   username: "nomnom"
  // },
  // {
  //   type: "incomingMessage",
  //   content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
  //   username: "Anonymous2"
  // },
  // {
  //   type: "incomingMessage",
  //   content: "This isn't funny. You're not funny",
  //   username: "nomnom"
  // },
  // {
  //   type: "incomingNotification",
  //   content: "Anonymous2 changed their name to NotFunny",
  // },
  