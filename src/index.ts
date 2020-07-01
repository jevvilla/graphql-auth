import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema, Resolver, Query } from "type-graphql";
import express from "express";

@Resolver()
class HelloResolver {
  @Query(() => String)
  async hello() {
    return "Hello There";
  }
}

const main = async () => {
  const app = express();
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
    }),
  });

  server.applyMiddleware({ app, path: "/graphql" });
  app.listen(4040, () =>
    console.log(`server running in: http://localhost:4040${server.graphqlPath}`)
  );
};

main();
