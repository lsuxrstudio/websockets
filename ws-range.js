const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Function to generate a random value within a range
function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Function to generate a random JSON message with random ranges
function generateRandomMessage() {
  const minRange = 1.0; // Minimum value for the range
  const maxRange = 3.0; // Maximum value for the range

  // Generate random values for the range
  const randomMinValue = getRandomInRange(minRange, maxRange).toFixed(2);
  const randomMaxValue = getRandomInRange(minRange, maxRange).toFixed(2);

  // Construct the JSON message with random ranges
  const jsonMessage = JSON.stringify({
    type: 'rcp_cur_str',
    id: 'LENS_FOCUS_DISTANCE',
    display: {
      str: `${randomMinValue}m - ${randomMaxValue}m`,
      abbr: `${randomMinValue}m - ${randomMaxValue}m`,
      status: 'NORMAL'
    }
  });

  return jsonMessage;
}

// Function to send the JSON message to all connected clients
function sendJsonMessageToClients() {
  const randomMessage = generateRandomMessage();

  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
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

// Schedule sending the JSON message to clients every 2 seconds
setInterval(sendJsonMessageToClients, 2000);

console.log('WebSocket server running on port 8080');
