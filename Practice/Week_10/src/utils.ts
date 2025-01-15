import { Client } from "pg";

export async function getClient() {
  const client = new Client("postgres://admin:password@localhost:5432/learningpostgres");
  await client.connect();
  return client;
}

console.log(getClient);
