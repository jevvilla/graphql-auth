import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import express from "express";

import { RegisterResolver } from "./modules/user/register/RegisterResolver";

const main = async () => {
  await createConnection();
  const app = express();
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [RegisterResolver],
    }),
  });

  server.applyMiddleware({ app, path: "/graphql" });
  app.listen(4040, () =>
    console.log(`server running in: http://localhost:4040${server.graphqlPath}`)
  );
};

main();
