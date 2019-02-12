import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  render() {
    return (
        <div>

          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
          </nav>

          <MessageList />
          <ChatBar />

        </div>

      )
    }
  }
  export default App;
  