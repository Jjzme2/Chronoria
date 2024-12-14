let websocket;

export function initializeWebSocket(url) {
  websocket = new WebSocket(url);

  websocket.onopen = () => {
    console.log('WebSocket connection established');
  };

  websocket.onclose = () => {
    console.log('WebSocket connection closed');
  };

  websocket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
}

export function sendMessage(message) {
  if (websocket && websocket.readyState === WebSocket.OPEN) {
    websocket.send(message);
  } else {
    console.error('WebSocket is not open. Ready state:', websocket.readyState);
  }
}

export function handleIncomingMessages(callback) {
  if (websocket) {
    websocket.onmessage = (event) => {
      callback(event.data);
    };
  } else {
    console.error('WebSocket is not initialized');
  }
}
