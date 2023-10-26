const mqtt = require('mqtt');

const client = mqtt.connect('http://localhost:1883'); 

const deviceId = 'dispositivo123'; 

function generateCoordinates() {
  const latitude = Math.random() * 90;
  const longitude = Math.random() * 180;
  return { latitude, longitude };
}

setInterval(() => {
  const coordinates = generateCoordinates();
  const message = JSON.stringify({ deviceId, ...coordinates });
  client.publish('location', message, { qos: 2 });
  console.log(`Enviado: ${message}`);
}, 3000);
