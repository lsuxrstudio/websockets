const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Event listener for when a client connects to the server
wss.on('connection', function connection(ws) {
  console.log('A client connected');

  // Event listener for when a message is received from a client
  ws.on('message', function incoming(message) {
    console.log('Received: %s', message);

    // Convert non-string messages into strings
    if (typeof message !== 'string') {
      message = message.toString();
    }

    // Echo the received message back to the client
    ws.send(message);
  });

  // Event listener for when a client disconnects from the server
  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server running on port 8080');
