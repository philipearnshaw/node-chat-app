const path = require('path'); // built in, no need to install
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicFolderPath =  path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicFolderPath));

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);

    // Emit to every single connection
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from client');
  });
});

server.listen(port, () => {
  console.log(`Server up on port ${port}`);
});
