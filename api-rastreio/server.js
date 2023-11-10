const { app } = require("./app");
const http = require("http");
// const socketIo = require('socket.io');
const { configureWebSocket } = require("./websocket.js");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = configureWebSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
