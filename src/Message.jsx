import React, {Component} from 'react';

// Message component, which displays the username and message; get appended to messagelist
function Message ({ username, message, color }) {
  const msgColor = {
    color
  };
  return (
    <div className="message">
      <span className="message-username" style={msgColor}>{username}</span>
      <span className="message-content">{message}</span>
    </div>  
  );
}
export default Message;
    