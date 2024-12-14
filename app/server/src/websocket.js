import WebSocket from 'ws';

let wss;

export function initializeWebSocketServer(server) {
  wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('close', () => {
      console.log('Client disconnected');
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });
}

export function handleIncomingWebSocketMessages(callback) {
  if (wss) {
    wss.on('connection', (ws) => {
      ws.on('message', (message) => {
        callback(message);
      });
    });
  } else {
    console.error('WebSocket server is not initialized');
  }
}

export function sendWebSocketMessageToClients(message) {
  if (wss) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  } else {
    console.error('WebSocket server is not initialized');
  }
}
