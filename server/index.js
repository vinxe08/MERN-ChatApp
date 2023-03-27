const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require('mongoose')
app.use(cors());

const server = http.createServer(app);

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const CreateRoute = require('./routes/Room');

// Routes
app.use('/room', CreateRoute)

// Web sockets
io.on("connection", (socket) => {

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => { });
});

// Database connection in MongoDB
const dbConfig = 'mongodb://localhost:27017'
const dbName = 'chat-app'

mongoose.connect(`${dbConfig}/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});