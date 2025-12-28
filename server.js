const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');

const app = express();
const server = http.createServer(app);

// Socket.io setup with CORS (Security fix)
const io = new Server(server, {
    cors: {
        origin: "*", // Sabhi jagah se connection allow karega
        methods: ["GET", "POST"]
    }
});

// 1. Child Page Route
app.get('/child', (req, res) => {
    res.sendFile(path.join(__dirname, 'child.html'));
});

// 2. Parent Page Route
app.get('/parent', (req, res) => {
    res.sendFile(path.join(__dirname, 'parent.html'));
});

// 3. Home Route (Check karne ke liye)
app.get('/', (req, res) => {
    res.send('<h1>Server is Live on Render! <br> Go to /child or /parent</h1>');
});

// Socket Logic
io.on('connection', (socket) => {
    // console.log('New User Connected: ' + socket.id);

    socket.on('screen-data', (data) => {
        // Child se data lekar Parent ko bhej do
        socket.broadcast.emit('screen-data', data);
    });
});

// Render ka PORT uthana zaroori hai
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
