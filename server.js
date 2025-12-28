const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// Serve client files
app.use(express.static(https://parent-6j0g.onrender.com));

io.on("connection", socket => {
  console.log("Connected:", socket.id);

  socket.on("offer", data => {
    socket.broadcast.emit("offer", data);
  });

  socket.on("answer", data => {
    socket.broadcast.emit("answer", data);
  });

  socket.on("ice", data => {
    socket.broadcast.emit("ice", data);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});

