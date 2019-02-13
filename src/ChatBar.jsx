import React, {Component} from 'react';

function ChatBar ({addMsg, user }) {
  const enterKey = evt => {
    if (evt.key == "Enter") {
      evt.preventDefault();
      addMsg(evt.target.value);
      evt.target.value = "";
    }
  }   
  return (
    <footer className="chatbar" >

      <input className="chatbar-username" placeholder="Your Name (Optional)"  defaultValue={user.name}/>
      <input className="chatbar-message" name="msg" onKeyPress={enterKey} placeholder="Type a message and hit ENTER" />

    </footer>    
  );
}
export default ChatBar;
