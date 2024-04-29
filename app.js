// Import required modules
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

// Initialize express app and create a server
const app = express();
const server = http.createServer(app);

// Set up Socket.IO
const io = socketIo(server);

// Define a route for handling socket connections
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/login', (req, res) =>{
    res.sendFile(__dirname + '/login.html');
});

app.post('/login',(req,res) =>{

    io.emit("login", req.query.hostId, req.query.userId);
    res.send('loginCalled ' + req.query.hostId + ' with user ');
});


app.post('/sendMessage',(req,res) =>{
    console.log("message called");
    io.emit("message", req.query.message);
    res.send('Custom event emitted');
});

// Define event handlers for socket connections
io.on('connection', (socket) => {
  console.log('A user connected');

//   socket.on('login', hostId => {
//     console.log('someone login using host ' + hostId);
//     // Broadcast the message to all connected clients
//     io.emit('login', hostId);
//   });



  // Event handler for when a user sends a message
  socket.on('message', (data) => {
    console.log('Message received:', data);
    // Broadcast the message to all connected clients
    io.emit('message', data);
  });

  // Event handler for when a user disconnects
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, '192.168.11.102',  () => {
  console.log(`Server is running on port ${PORT}`);
});
