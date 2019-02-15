const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require ('uuid');
const genColor = require('../helpers.js');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Our clients, sockets
const clientBase = [];
let counter = 0;

// Adding sockets to the array, and notifying of successful connection in the log
wss.on('connection', (ws) => {
  console.log('Client connected!!!!!!');
  clientBase.push(ws);
  counter ++;
  clientBase.forEach(client => {
    if (client.readyState === ws.OPEN) {
      const count = {type: "counter", content: `# of users online: ${counter}` };
      client.send(JSON.stringify(count));
    }
  });
  // Receives message from the clientside, adds a UUID
  ws.on('message', (msg) => {
    let message = JSON.parse(msg);
    let msgColor = genColor();
    if (message.type === "postMessage") {
      message.id = uuid();
      message.type = "incMessage";
    }
    if (message.type === "postNotification") {
      message.id = uuid();
      message.type = "incNotification";
      message.content = `'${message.oldUser}' has changed their name to '${message.newUser}'`;
      message.color = msgColor;
      console.log(message.color)
    }
    // If the socket is connected, sends back the modified message to everbody who is connected 
    clientBase.forEach(client => {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify(message));
      }
    })
  });
  // Set up a callback for when a client closes the socket
  ws.on('close', () => {
  console.log('Client disconnected!!!!');
  counter --;
  clientBase.forEach(client => {
    if (client.readyState === ws.OPEN) {
      const count = {type: "counter", content: `# of users online: ${counter}` };
      client.send(JSON.stringify(count));
    }
  });
  });
});  