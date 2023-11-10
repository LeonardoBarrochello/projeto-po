const mqtt = require("mqtt");

const client = mqtt.connect("http://localhost:1883");

const deviceId = "cbb4c1e2-f8d6-458c-8f21-ba438c9477dd";

// Coordenadas iniciais
let latitude = -23.5505;
let longitude = -46.6333;

// Função para gerar pequenas alterações nas coordenadas
function generateCoordinateChange() {
  // Alterações pequenas para simular movimento
  const deltaLat = (Math.random() - 0.5) * 0.01;
  const deltaLon = (Math.random() - 0.5) * 0.01;

  // Aplica as alterações às coordenadas
  latitude += deltaLat;
  longitude += deltaLon;

  return { latitude, longitude };
}

setInterval(() => {
  const coordinateChange = generateCoordinateChange();
  const message = JSON.stringify({ deviceId, ...coordinateChange });
  client.publish("location", message, { qos: 2 });
  console.log(`Enviado: ${message}`);
}, 3000);
