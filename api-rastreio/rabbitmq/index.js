const amqp = require('amqplib');

const rabbitmqHost = 'amqp://guest:guest@localhost:5672'; // Substitua pelo endereço do seu servidor RabbitMQ

async function connectToRabbitMQ() {
  try {
    const connection = await amqp.connect(rabbitmqHost);
    const channel = await connection.createChannel();

    return channel;
  } catch (error) {
    console.error('Erro ao conectar ao RabbitMQ:', error);
  }
}

async function consumeQueue(channel) {
      const queueName = 'location_queue'; // Substitua pelo nome da fila que deseja consultar
    
      try {
        await channel.assertQueue(queueName, { durable: false });
    
        channel.consume(queueName, (message) => {
          if (message !== null) {
            const content = message.content.toString();
            console.log('Mensagem recebida:', content);
    
            // Implemente o processamento da mensagem aqui
    
            channel.ack(message); // Confirme o recebimento da mensagem
          }
        });
      } catch (error) {
        console.error('Erro ao consumir a fila:', error);
      }
 
}

async function main() {
      const channel = await connectToRabbitMQ();
      if (channel) {
        await consumeQueue(channel);
      }
}

module.exports = { main}
    
    
