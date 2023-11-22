const amqp = require("amqplib");
const { addToCache } = require("../cache/cache.js");
const { prismaClient } = require("../prismaClient.js");
const io = require("../server.js");
const rabbitmqHost = "amqp://guest:guest@localhost:5672";

async function connectToRabbitMQ() {
  try {
    const connection = await amqp.connect(rabbitmqHost).catch((e) =>  console.log("NÃO FOI POSSÍVEL CONECTAR O CLIENT DO RABBITMQ!"));
    
    if(!connection){

      return null;
    }
    
    const channel = await connection.createChannel();
    return channel;


  } catch (error) {
    console.error("Erro ao conectar ao RabbitMQ:", error);
  }
}

async function consumeQueue(channel) {
  const queueName = "location_queue"; // Substitua pelo nome da fila que deseja consultar

  try {
    await channel.assertQueue(queueName, { durable: false });

    channel.consume(queueName, async (message) => {
      if (message !== null) {
        let { deviceId, latitude, longitude } = JSON.parse(
          message.content.toString()
        );

        let dispositivoExiste = await prismaClient.dispositivo
          .findFirst({
            where: {
              id: deviceId,
            },
          })
          .catch(() => null);

        if (dispositivoExiste && dispositivoExiste.ativo) {
          let localizacao = await prismaClient.localizacao
            .create({
              data: {
                latitude: latitude,
                longitude: longitude,
                dispositivo: {
                  connect: {
                    id: dispositivoExiste.id,
                  },
                },
              },
            })
            .catch(() => null);
          if (localizacao) {
            await addToCache(localizacao.id, {
              localizacaoid: localizacao.id,
              latitude,
              longitude,
            });
          }
        }
        channel.ack(message);
      }
    });
  } catch (error) {
    console.error("Erro ao consumir a fila:", error);
  }
}

async function main() {
  const channel = await connectToRabbitMQ();
  if (channel) {
    await consumeQueue(channel);
  }
}

module.exports = { main };
