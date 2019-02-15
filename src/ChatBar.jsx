import React, {Component} from 'react';

// Chat bar component, where a user can edit their nickname and send a message to everyone else
function ChatBar ({addMsg, setUser, user }) {
  const color = user.color;
  const userColor = {
    color
  }
  // Catching the push Enter button event, and sedning the message up to the parent state thru the function passed down
  const enterKey = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      addMsg(e.target.value);
      e.target.value = "";
    }
  }   
  // Calling the setUser function on focus out of the name field
  const focusOut = e => {
      if (user.name !== e.target.value){
        setUser(e.target.value);
      }
  }
  // Html component
  return (
    <footer className="chatbar" >
      <input className="chatbar-username" placeholder="Your Name" onBlur={focusOut} style={userColor} defaultValue={user.name}/>
      <input className="chatbar-message" onKeyPress={enterKey} placeholder="Type a message and hit ENTER" />
    </footer>    
  );
}
export default ChatBar;
