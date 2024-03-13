const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Function to generate a random JSON message
function generateRandomMessage() {
  const randomData = {
    message: 'Hello from server!',
    randomValue: Math.random(),
    timestamp: new Date().toISOString()
  };
  return JSON.stringify(randomData);
}

// Send random JSON message to all connected clients every 2 seconds
function sendRandomMessageToClients() {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      const randomMessage = generateRandomMessage();
      client.send(randomMessage);
    }
  });
}

// Event listener for when a client connects to the server
wss.on('connection', function connection(ws) {
  console.log('A client connected');

  // Event listener for when a client disconnects from the server
  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});

// Schedule sending random messages to clients every 2 seconds
setInterval(sendRandomMessageToClients, 2000);

console.log('WebSocket server running on port 8080');
