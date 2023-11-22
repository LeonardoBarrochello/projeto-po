const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);

const port = 1883; // Porta MQTT padrão

server.listen(port, () => {
  console.log(`Broker MQTT está ouvindo na porta ${port}`);
});

aedes.on('client', (client) => {
  console.log(`Cliente conectado: ${client.id}`);
});

aedes.on('clientDisconnect', (client) => {
  console.log(`Cliente desconectado: ${client.id}`);
});

aedes.on('publish', (packet, client) => {
  console.log("recebido" , packet)
  if (client) {
    aedes.publish({
      topic: packet.topic,
      payload: packet.payload,
      qos: 2, 
      retain: false, 
      dup: false,
    });
  }
});
