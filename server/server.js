const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log('A user connected');

  // Example: Handling a custom 'message' event from the client
  socket.on('client-message', (message) => {
    console.log('Received message from client:', message);

    // Broadcast the message to all connected clients (excluding the sender)
    socket.broadcast.emit('server-message', message);
  });

  // Example: Handling the 'disconnect' event
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const port = 5000; // Use the port you want to listen on
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
