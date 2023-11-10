const { prismaClient } = require("../prismaClient.js");

class DispositivoController {
  async create(req, res) {
    try {
      await prismaClient.dispositivo.create({ data: req.body });
      return res.status(201).send();
    } catch (error) {
      return res.status(422).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      await prismaClient.dispositivo.update({
        data: req.body,
        where: {
          id: req.params.id,
        },
      });
      return res.status(201).send();
    } catch (error) {
      return res.status(422).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getById(req, res) {
    try {
      let dispositivo = await prismaClient.dispositivo.findFirst({
        where: {
          id: req.params.id,
        },
      });
      if (!dispositivo) {
        return res.status(422).json({
          message: "Dispositivo não encontrado!",
        });
      }
      return res.status(200).json(dispositivo);
    } catch (error) {
      return res.status(422).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      let dispositivo = await prismaClient.dispositivo.findFirst({
        where: {
          id: req.params.id,
        },
      });
      if (!dispositivo) {
        return res.status(422).json({
          message: "Dispositivo não encontrado!",
        });
      }
      await prismaClient.dispositivo.delete({
        where: {
          id: dispositivo.id,
        },
      });
      return res.status(201).send();
    } catch (error) {
      return res.status(422).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getLocalizacoes(req, res) {
    try {
      let dispositivo = await prismaClient.dispositivo.findFirst({
        where: {
          id: req.params.id,
        },
      });
      if (!dispositivo) {
        return res.status(422).json({
          message: "Dispositivo não encontrado!",
        });
      }

      let localizacoes = await prismaClient.localizacao.findMany({
        where: {
          id_dispositivo: dispositivo.id,
        },
        orderBy: {
          created_at: "desc",
        },
      });

      return res.status(200).json(localizacoes);
    } catch (error) {
      return res.status(422).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = DispositivoController;
