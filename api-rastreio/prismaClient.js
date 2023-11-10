const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient({
  datasources: {
    db: {
      url: "file:../database/api-rastreio.db",
    },
  },
});

module.exports = { prismaClient };
