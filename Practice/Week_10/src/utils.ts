import { Client } from "pg";

export async function getClient() {
  const client = new Client("postgres://postgres:password@localhost:5432/postgres");
  await client.connect();
  return client;
}

console.log(getClient);
