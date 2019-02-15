# Chatty! 

#### A single page, minimal chat app. Built with React and Websockets. Users send and receive messages in real time.

### Final Product

!["1"](https://raw.github.com/Stan-Solo/ChattyApp/blob/master/Screenshots/01.png )
!["2"](https://raw.github.com/Stan-Solo/ChattyApp/blob/master/Screenshots/02.png )
!["3"](https://raw.github.com/Stan-Solo/ChattyApp/blob/master/Screenshots/03.png )

### Features

- A user can enter the app and send text messages to other connected users
- Every user can change their name
- Get a random color assigned upon every name change!
- Displays the number of users currently connected
- All users are notified whenever somebody changes their user name

### Installation

Install the dependencies and start up the websocket server.

*'cd chatty-server
npm install
npm start'*

Install the dependencies and fire up the front-end server server

*'npm install
npm start
navigate to http://localhost:3000 '*

### Dependencies

#### Client side:
- babel-core
- babel-loader
- babel-preset-es2015
- babel-preset-react
- css-loader
- node-sass
- sass-loader
- sockjs-client
- style-loader
- webpack
- webpack-dev-server
- react
- react-dom

#### Server:
- express
- ws
- uuid