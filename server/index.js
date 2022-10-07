const express = require("express");
const path = require("path");
const cors = require("cors");
const http = require("http");
const {Server} = require("socket.io");
require("dotenv").config({ path: "./config.env" });

const PORT = process.env.PORT || 3001;

const app = express();
const server = http.createServer(app);
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    console.log(data);
    socket.broadcast.emit("receive_message", data)
  })
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
