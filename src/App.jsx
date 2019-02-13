import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.addMsg = this.addMsg.bind(this);
    this.setCurrentUser = this.setCurrentUser.bind(this);

    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [],
      loading: true,
    };
  }
  
  addMsg(content) {
    // const oldMsgs = this.state.messages;
    // const newMsgObj = {
    //   username: this.state.currentUser.name,
    //   content
    // };
    // const newMsgs = [...oldMsgs, newMsgObj];
    // this.setState({messages: newMsgs})  

    const username = this.state.currentUser.name;
    this.socket.send(JSON.stringify({username, content}));
  }

  setCurrentUser(user) {
    this.setState( {currentUser: {name: user} } )
  }

 
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    // Event listener that is fired when socket is connected
    this.socket.onopen = () => {
      console.log('Client connected');
    };
    // Listener for when socket receives a message from the server
    this.socket.onmessage = (function ({data}) {
      this.setState({messages: this.state.messages.concat(JSON.parse(data))});
    }).bind(this);
    // Event listener that is fired when socket is closed 
    this.onclose = () => { 
      console.log('Client disconnected');
    };

    setTimeout(() => {
      const newMessage = {id: '1', username: "Michelle", content: "Hello there!"};
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
          <ChatBar addMsg={this.addMsg} setUser={this.setCurrentUser} user={this.state.currentUser} />

        </div>
        )
      }
    }
  }
  export default App;
  