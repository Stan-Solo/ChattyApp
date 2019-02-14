import React, {Component} from 'react';

// Message component, which displays the username and message; get appended to messagelist
function Message ({ username, message }) {
  return (
    <div className="message">
      <span className="message-username">{username}</span>
      <span className="message-content">{message}</span>
    </div>  
  );
}
export default Message;
    