import React, {Component} from 'react';

function ChatBar ({addMsg, user }) {
  const enterKey = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      addMsg(e.target.value);
      e.target.value = "";
    }
  }   
  // const nameChange = e => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     changeUser = 
  //   }
  // }
  return (
    <footer className="chatbar" >

      <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={user.name}/>
      <input className="chatbar-message" name="msg" onKeyPress={enterKey} placeholder="Type a message and hit ENTER" />

    </footer>    
  );
}
export default ChatBar;
