import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import { typeDefs } from "./gql/schema.ts";
import { Query } from "./resolvers/query.ts";
import { Mutation } from "./resolvers/mutation.ts";
import { Usuario } from "./resolvers/Usuario.ts";
import { Coleccion } from "./resolvers/Coleccion.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

try {
  await mongoose.connect(MONGO_URL);
console.log("Conexión exitosa a MongoDB");
} catch (error) {
console.error("Error al conectar a MongoDB:", error);
}

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Usuario,
    Coleccion,
  },
});

const { url } = await startStandaloneServer(server);
console.info(`🚀 Server ready at ${url}`);