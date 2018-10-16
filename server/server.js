const path = require('path'); // built in, no need to install
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicFolderPath =  path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicFolderPath));

io.on('connection', (socket) => {
  console.log('Client connected');

  // Emit to every single connection
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  // Emit to every single connection besides this socket
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has just joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);

    callback();

    io.emit('newMessage', generateMessage(message.from, message.text));
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from client');
  });
});

server.listen(port, () => {
  console.log(`Server up on port ${port}`);
});
