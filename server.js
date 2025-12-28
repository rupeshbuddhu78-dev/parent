const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" } // Allow any domain
});

// Serve parent.html automatically at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "parent.html"));
});

// Serve static files (child.html etc.)
app.use(express.static(__dirname));

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  // WebRTC signaling events
  socket.on("offer", (data) => {
    socket.broadcast.emit("offer", data);
  });

  socket.on("answer", (data) => {
    socket.broadcast.emit("answer", data);
  });

  socket.on("ice", (data) => {
    socket.broadcast.emit("ice", data);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
  });
});

// Use Render PORT or default 3000
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
