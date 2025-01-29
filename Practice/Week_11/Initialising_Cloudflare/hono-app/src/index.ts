import { Hono } from "hono";

const app = new Hono();

app.post("/", async (c) => {
  // Changed to POST since we're reading body
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));

  // Get the request body
  const body = await c.req.json();
  console.log(body);

  return c.text("Hello Hono!");
});

export default app;
