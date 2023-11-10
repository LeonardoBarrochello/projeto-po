const socketIO = require("socket.io");
const { prismaClient } = require("./prismaClient.js"); // Substitua pelo seu módulo real

function configureWebSocket(server) {
  const io = socketIO(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", async (socket) => {
    console.log("conectado");
    // Enviar a última localização ao cliente ao se conectar
    const latestLocation = await prismaClient.localizacao.findFirst({
      orderBy: {
        created_at: "desc",
      },
    }); // Implemente sua lógica real aqui

    socket.emit("locationUpdate", latestLocation);

    // Lógica para lidar com eventos do cliente, se necessário
  });

  return io;
}

module.exports = { configureWebSocket };
