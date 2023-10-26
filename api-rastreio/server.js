
const {app} = require('./app')
const http = require('http')
const socketIo = require('socket.io');


const PORT = process.env.PORT || 6000;


const server = http.createServer(app);

const io = socketIo(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
