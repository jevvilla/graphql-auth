import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import session from "express-session";
import express from "express";
import connectRedis from "connect-redis";
import cors from "cors";

import { redis } from "./redis";

const main = async () => {
  await createConnection();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + "/modules/**/*.ts"],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  const app = express();

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: "gqlidt",
      secret: "DugkSsgE487sS6j8GNmw",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    })
  );

  server.applyMiddleware({
    app,
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  app.listen(4040, () =>
    console.log(`server running in: http://localhost:4040${server.graphqlPath}`)
  );
};

main();
