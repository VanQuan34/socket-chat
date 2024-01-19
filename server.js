const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'dist/angular-socket-chat')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/angular-socket-chat/index.html'));
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('message', (message) => {
    io.emit('message', message);
    console.log('message==', message); // Broadcast the message to all connected clients
  });

  socket.on('typing', (message) => {
    io.emit('typing', message);
    console.log('typing==', message); // Broadcast the message to all connected clients
  });

  socket.on('disconnect', () => {
    // io.emit('disconnect', '');
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
