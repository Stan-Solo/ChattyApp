import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Counter from './Counter.jsx';

// Main component, includes all others
class App extends Component {
  constructor(props){
    super(props);

    // Necessary bindings
    this.addMsg = this.addMsg.bind(this);
    this.setCurrentUser = this.setCurrentUser.bind(this);

    // Setting initial state
    this.state = {
      currentUser: {name: "Anonymous", color: "black"},
      messages: [],
      counterMsg: {},
      loading: true,
    };
  }

  // Send the message to the server
  addMsg(content) {
    const username = this.state.currentUser.name;
    this.socket.send(JSON.stringify({username, content, type: "postMessage"}));
  }

  // Allows user to change name
  setCurrentUser(user) {
    this.socket.send(JSON.stringify({newUser: user, oldUser: this.state.currentUser.name, type: "postNotification" }));
    this.setState( {currentUser: {name: user} } );
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
      let receivedData = JSON.parse(data);
      
      // A switch statement to sort out between all the incoming messages
      switch (receivedData.type) {
        case ("counter") :
          this.setState({
            counterMsg : receivedData.content 
          });
          break;
        case ("incMessage") :
          this.setState({
            messages: this.state.messages.concat(receivedData)
          });
          break;
        case ("incNotification") :
          this.setState({
            messages: this.state.messages.concat(receivedData)
          });
          break;
        case ("colorAssignment") :
          this.setState({
            currentUser: {
              name: this.state.currentUser.name, 
              color: receivedData.color
            }
          });
          break;
        }
    }).bind(this);

    // Event listener that is fired when socket is closed
    this.onclose = () => {
      console.log('Client disconnected');
    };

    // Timeout before page gets rendered
    setTimeout(() => {
      this.setState({loading: false});
    }, 500);
  }

  // What gets rendered
  render() {
      if (this.state.loading) {
        return <h1> Loading, please wait...</h1>
      } else {
        return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
            <Counter msg={this.state.counterMsg} />
          </nav>
          <MessageList messages={this.state.messages}  />
          <ChatBar addMsg={this.addMsg} setUser={this.setCurrentUser} user={this.state.currentUser}/>
        </div>
        )
      }
    }
  }
  export default App;
