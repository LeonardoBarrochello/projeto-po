const express = require("express");
const app = express();
const mqtt = require("mqtt");
const amqp = require("amqplib/callback_api");
const { default: axios } = require("axios");
app.use(express.json());

let dispositivoApi = axios.create({
  baseURL: "http://localhost:5000/dispositivos",
});
const mqttBroker = "http://localhost:1883"; // Endereço do broker MQTT

const port = 8080;
app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});

const client = mqtt.connect(mqttBroker);

client.on("connect", () => {
  console.log("API está conectada ao broker MQTT");
  client.subscribe("location");
});

client.on("message", async (topic, message) => {
  if (topic === "location") {
    const data = JSON.parse(message.toString());
    console.log("Dados de localização recebidos:", data);

    try {
      let dispositivo = await dispositivoApi.get(data.deviceId);
      if (dispositivo.status == 200 && dispositivo.data.ativo) {
        // Enviar dados para a fila RabbitMQ
        return sendToRabbitMQ(data);
      }
      console.log("nao existe");
    } catch (error) {
      console.log("erro", error?.response?.data ?? error.message);
      return;
    }
  }
});

app.post("/location", (req, res) => {
  const { deviceId, latitude, longitude } = req.body;
  const message = JSON.stringify({ deviceId, latitude, longitude });
  client.publish("location", message);
  res.status(200).send("Dados de localização encaminhados com sucesso.");
});

function sendToRabbitMQ(data) {
  amqp.connect("amqp://guest:guest@localhost:5672", (error0, connection) => {
    if (error0) {
      throw error0;
    }

    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }

      const queueName = "location_queue"; // Nome da fila no RabbitMQ

      // Declara a fila (certifique-se de que a fila existe no RabbitMQ)
      channel.assertQueue(queueName, {
        durable: false,
      });

      // Converte os dados em uma string JSON
      const message = JSON.stringify(data);

      // Publica a mensagem na fila
      channel.sendToQueue(queueName, Buffer.from(message));

      console.log("Dados de localização enviados para a fila RabbitMQ");

      // Fecha a conexão com o RabbitMQ após enviar a mensagem
      setTimeout(() => {
        connection.close();
      }, 500);
    });
  });
}
