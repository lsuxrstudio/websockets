/**
 * For instance a minimal WebSockets server based on nodejs and the ws package (https://www.npmjs.com/package/ws).
 * Install the package mentioned above first:
 *   npm install --save ws
 */

const WebSocket = require('ws');
const webSocketServer = new WebSocket.Server({ port: 3000 });

webSocketServer.on('connection', (webSocketConnection) => {
  console.log('Received connection from UE4 WebSocket client.');

  webSocketConnection.on('message', (message) => {
    console.log('Received message from UE4 WebSocket client: %s.', message);
  });

  webSocketConnection.send('{"event": "welcome", "data": "welcome message data"}');

  const intervalId = setInterval(() => { 
    count++;
    webSocketConnection.send('{"event": "focus", "data": "'+count+'"}');
    
    if (count > 50) { 
      count = 0
    } 
  }, 1000); 

});

let count = 0; 
  
