// npm run devStart 
const io = require('socket.io')(3000, {
    cors: {
      origin: "*", // Allow all origins for development purposes
      methods: ["GET", "POST"]
    }
  });
  
  const users = {}

  io.on('connection', socket => {
    socket.on('new-user', name => {
      users[socket.id] = name
      socket.broadcast.emit('user-connected', name)
    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]})
    })
    socket.on('disconnect', () => {
      socket.broadcast.emit('user-disconnected', users[socket.id])
      delete users [socket.id]
    })
  });
  
  console.log('Socket.IO server is running on port 3000');
  