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

  socket.emit('newMessage', {
    from: 'mike',
    text: 'New create message',
    createdAt: 123123
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from client');
  });
});

server.listen(port, () => {
  console.log(`Server up on port ${port}`);
});
