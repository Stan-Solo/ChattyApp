import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import {generateRandomId} from './gen-random.js';

class App extends Component {
  constructor(props){
    super(props);
    this.addMsg = this.addMsg.bind(this);

    this.state = {
      currentUser: {name: "Don Juan"},
      messages: [        
          {
            id: 'id1',
            username: "Bob",
            content: "Has anyone seen my marbles?",
          },
          {
            id: 'id2',
            username: "Charles",
            content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
          }
        ],
      loading: true,
    };
  }

  addMsg(msg) {
    const oldMsgs = this.state.messages;
    const newMsgObj = {
      id: generateRandomId(),
      username: this.state.currentUser.name,
      content: msg
    };
    const newMsgs = [...oldMsgs, newMsgObj];
    this.setState({messages: newMsgs})  

    const message = JSON.parse(msg);
    const user = JSON.parse(this.state.currentUser.name);
    this.socket.send(msg);

  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    // Event listener that is fired when socket is connected
    this.socket.onopen = () => {
      console.log('Client connected');
    };
 
    // this.socket.onmessage = function(event) {
    //   console.log(e.data);

    //   var f = document.getElementById("chatbox").contentDocument;
    //   var text = "";
    //   var msg = JSON.parse(event.data);
    //   var time = new Date(msg.date);
    //   var timeStr = time.toLocaleTimeString();
      
    //   switch(msg.type) {
    //     case "id":
    //       clientID = msg.id;
    //       setUsername();
    //       break;
    //     case "username":
    //       text = "<b>User <em>" + msg.name + "</em> signed in at " + timeStr + "</b><br>";
    //       break;
    //     case "message":
    //       text = "(" + timeStr + ") <b>" + msg.name + "</b>: " + msg.text + "<br>";
    //       break;
    //     case "rejectusername":
    //       text = "<b>Your username has been set to <em>" + msg.name + "</em> because the name you chose is in use.</b><br>"
    //       break;
    //     case "userlist":
    //       var ul = "";
    //       for (i=0; i < msg.users.length; i++) {
    //         ul += msg.users[i] + "<br>";
    //       }
    //       document.getElementById("userlistbox").innerHTML = ul;
    //       break;
    //   }
      
    //   if (text.length) {
    //     f.write(text);
    //     document.getElementById("chatbox").contentWindow.scrollByPages(1);
    //   }
    // };



    // Listener for when socket receives a message from the server
    // The parameter e is a MessageEvent which contains the message from the server along with some metadata.
    // this.socket.onmessage = e => {
    //   // the actual message from the server is contained in the `data` key
    //   console.log(e.data);
    // };

    // Event listener that is fired when socket is closed 
    this.onclose = () => {
      console.log('Client disconnected');
    };

    setTimeout(() => {
      const newMessage = {id: 'id3', username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages, loading: false});
    }, 500);    
  }

  render() {
      if (this.state.loading) {
        return <h1> Loading, please wait...</h1>
      } else {
        return (  
        <div>

          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
          </nav>

          <MessageList messages={this.state.messages} />
          <ChatBar addMsg={this.addMsg} user={this.state.currentUser} />

        </div>
        )
      }
    }
  }
  export default App;
  