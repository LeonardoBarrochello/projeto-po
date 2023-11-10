const { app } = require("./app");
const { ApolloServer, gql } = require("apollo-server-express");

// Simulando um banco de dados
const db = {
  dispositivos: {},
  metricas: [],
};

const typeDefs = gql`
  type Dispositivo {
    id: ID!
    marca: String!
  }

  type Metrica {
    id_dispositivo: ID!
    quantidade_posicao: Int!
    total_km: Float!
  }

  type Query {
    consultaDispositivo(id_dispositivo: ID!, dia: String): Metrica
    consultaMarca(marca: String!, dia: String): Metrica
    consultaGeral(dia: String): Metrica
  }
`;

const resolvers = {
  Query: {
    consultaDispositivo: (_, { id_dispositivo, dia }) => {
      // Lógica para consultar e retornar métricas por dispositivo
    },
    consultaMarca: (_, { marca, dia }) => {
      // Lógica para consultar e retornar métricas por marca
    },
    consultaGeral: (_, { dia }) => {
      // Lógica para consultar e retornar métricas gerais
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
