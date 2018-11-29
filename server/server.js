const path = require('path'); // built in, no need to install
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicFolderPath =  path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicFolderPath));

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }

    socket.join(params.room);
    users.removeUser(socket.id); // Remove from other rooms
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    // Emit to every single connection
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    // Emit to every single connection in the room besides this socket
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has just joined`));

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);

    callback();

    io.emit('newMessage', generateMessage(message.from, message.text));
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    // Only emit if they were in a room
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });
});

server.listen(port, () => {
  console.log(`Server up on port ${port}`);
});
