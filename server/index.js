const express = require("express");
const path = require("path");
const cors = require("cors");
const http = require("http");
const {Server} = require("socket.io");
require("dotenv").config();
const dbPool = require('./dbShae/dbShae');
const messagingRouter = require("./routes/messagingRouter");

const PORT = process.env.PORT || 3001;

const app = express();
const server = http.createServer(app);
app.use(cors());

app.use((req,res,next) => {
  req.pool = dbPool;
  next();
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/build")));

app.use('/messaging', messagingRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

io.on("connection", async (socket) => {
  console.log(`User connected: ${socket.id}`);

  const userID = socket.handshake.query.id;
  const query = `SELECT match_id FROM match WHERE person1 = $1 
                 UNION 
                 SELECT match_id FROM match WHERE person2 = $1;`;

  const { rows } = await dbPool.query(query, [userID])
  
  console.log(`user ID is ${userID}`);
  

  const matches = rows.map((element) => {
    return String(element.match_id);
  })

  console.log(matches);

  await socket.join(matches);

  console.log(socket.rooms);

  socket.on("send_message", async (data) => {
    console.log(data);
    const insertQuery = `INSERT INTO message (match_id, sender, message, date_message) 
                         VALUES ($1, $2, $3, NOW())`;
    await dbPool.query(insertQuery, [data.messageData.convoID, data.messageData.sender, data.messageData.message]);
    socket.to(String(data.messageData.convoID)).emit("receive_message", data)
  })
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
