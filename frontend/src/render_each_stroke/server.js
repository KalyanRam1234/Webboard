const WebSocket = require('ws');

// create a new WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// array to store pen stroke data
let strokes = [];

// when a new client connects
wss.on('connection', function connection(ws) {
  console.log('client connected');

  // send existing strokes to the client
  ws.send(JSON.stringify(strokes));

  // when a message is received from the client
  ws.on('message', function incoming(message) {
    // add the new stroke to the array
    strokes.push(JSON.parse(message));
    // broadcast the stroke data to all connected clients (including the sender)
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});
