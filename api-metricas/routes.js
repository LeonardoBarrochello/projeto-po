const { Router } = require("express");

const router = Router();

router.post("/api/nova-localizacao", (req, res) => {
  const { id_dispositivo, marca, distancia } = req.body;

  // Lógica para processar a distância acumulada e incrementar o número de posições
  // Salvar as informações no banco de dados (simulado aqui)
  if (!db.dispositivos[id_dispositivo]) {
    db.dispositivos[id_dispositivo] = {
      marca,
      quantidade_posicao: 0,
      total_km: 0,
    };
  }

  db.dispositivos[id_dispositivo].quantidade_posicao += 1;
  db.dispositivos[id_dispositivo].total_km += distancia;

  // Salvar a métrica
  db.metricas.push({
    id_dispositivo,
    quantidade_posicao: db.dispositivos[id_dispositivo].quantidade_posicao,
    total_km: db.dispositivos[id_dispositivo].total_km,
  });

  res.json({ message: "Localização recebida com sucesso!" });
});

module.exports = { router };
