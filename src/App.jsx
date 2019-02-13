import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import {generateRandomId} from './gen-random.js';

class App extends Component {
  constructor(props){
    super(props);
    this.addMsg = this.addMsg.bind(this);

    this.state = {
      currentUser: {name: "Don Juan"}, // optional. if currentUser is not defined, it means the user is Anonymous
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
  }

  componentDidMount() {
    setTimeout(() => {
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages, loading: false});
    }, 500)
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
  