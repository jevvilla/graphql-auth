import { createConnection, Connection } from "typeorm";

export const testConnection = (drop: boolean = false): Promise<Connection> => {
  return createConnection({
    name: "default",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "",
    database: "graphql-auth-test",
    synchronize: drop,
    dropSchema: drop,
    entities: [__dirname + "/../entity/**/**.ts"],
  });
};
