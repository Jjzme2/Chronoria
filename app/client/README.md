# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

## WebSocket Integration

This section provides an overview of the WebSocket integration in the client-side code.

### Initializing WebSocket Connection

To initialize a WebSocket connection, use the `initializeWebSocket` function from the `websocket.js` module. This function takes the WebSocket server URL as a parameter.

Example:
```javascript
import { initializeWebSocket } from './websocket.js';

const websocketUrl = 'ws://localhost:8080';
initializeWebSocket(websocketUrl);
```

### Sending Messages

To send messages through the WebSocket connection, use the `sendMessage` function from the `websocket.js` module. This function takes the message to be sent as a parameter.

Example:
```javascript
import { sendMessage } from './websocket.js';

const message = 'Hello, WebSocket!';
sendMessage(message);
```

### Handling Incoming Messages

To handle incoming WebSocket messages, use the `handleIncomingMessages` function from the `websocket.js` module. This function takes a callback function as a parameter, which will be called with the incoming message data.

Example:
```javascript
import { handleIncomingMessages } from './websocket.js';

function onWebSocketMessage(data) {
  console.log('Received message:', data);
}

handleIncomingMessages(onWebSocketMessage);
```
