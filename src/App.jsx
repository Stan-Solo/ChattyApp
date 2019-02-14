import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

// Main component, includes all others
class App extends Component {
  constructor(props){
    super(props);
    // Necessary bindings
    this.addMsg = this.addMsg.bind(this);
    this.setCurrentUser = this.setCurrentUser.bind(this);

    // Setting initial state
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [],
      loading: true,
    };
  }

  // Send the message to the server
  addMsg(content) {
    const username = this.state.currentUser.name;
    this.socket.send(JSON.stringify({username, content}));
  }

  // Allows user to change name
  setCurrentUser(user) {
    this.setState( {currentUser: {name: user} } )
  }

  // This happens once the page gets rendered
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    // Event listener that is fired when socket is connected
    this.socket.onopen = () => {
      console.log('Client connected');
    };
    // Appends the received and modified message from the serves to the state
    this.socket.onmessage = (function ({data}) {
///////////// DO THE NOTIFICATIONS HERE


      this.setState({messages: this.state.messages.concat(JSON.parse(data))});
    }).bind(this);
    // Event listener that is fired when socket is closed
    this.onclose = () => {
      console.log('Client disconnected');
    };
    // Hardcoded first greeting message, and a timeout before page gets rendered
    setTimeout(() => {
      // const newMessage = {id: '1', username: "Michelle", content: "Hello there!"};
      // const messages = this.state.messages.concat(newMessage);
      this.setState({loading: false});
    }, 500);
  }
  // Html component
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
