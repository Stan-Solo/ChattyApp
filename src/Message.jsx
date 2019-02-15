import React, {Component} from 'react';

// Message component, which displays the username and message; get appended to messagelist
function Message ({ username, message, color }) {
  const userColor = {
    color
  }
  console.log(userColor, username)
  return (
    <div className="message">
      <span className="message-username" style={userColor}>{username}</span>
      <span className="message-content"style={userColor}>{message}</span>
    </div>  
  );
}
export default Message;
    