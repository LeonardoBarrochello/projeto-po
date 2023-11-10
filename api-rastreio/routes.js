const { Router } = require("express");
const { prismaClient } = require("./prismaClient.js");
const DispositivoController = require("./controllers/dispositivoController.js");

const router = Router();

const dispositivoController = new DispositivoController();

// Rota para criar um dispositivo
router.post("/dispositivos", async (req, res) => {
  // Implemente a lógica para criar um dispositivo no banco de dado
  return dispositivoController.create(req, res);
});

// Rota para atualizar um dispositivo
router.put("/dispositivos/:id", async (req, res) => {
  // Implemente a lógica para atualizar um dispositivo no banco de dados
  return dispositivoController.update(req, res);
});

// Rota para obter informações de um dispositivo
router.get("/dispositivos/:id", async (req, res) => {
  // Implemente a lógica para consultar um dispositivo no banco de dados
  return dispositivoController.getById(req, res);
});

// Rota para remover um dispositivo
router.delete("/dispositivos/:id", async (req, res) => {
  // Implemente a lógica para remover um dispositivo do banco de dados
  return dispositivoController.delete(req, res);
});

// Rota para consultar o histórico de localizações de um dispositivo
router.get("/dispositivos/:id/localizacoes", async (req, res) => {
  // Implemente a lógica para consultar o histórico de localizações de um dispositivo
  return dispositivoController.getLocalizacoes(req, res);
});

module.exports = { router };
