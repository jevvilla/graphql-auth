import { graphql } from "graphql";
import { Connection } from "typeorm";

import { testConnection } from "../../../../src/tests/testConnection";

let connection: Connection;
beforeAll(async () => {
  connection = await testConnection();
});

afterAll(async () => {
  await connection.close();
});

describe("Register", () => {
  it("create user", () => {
    // graphql({});
  });
});
