import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, decode, verify } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  };
}>();

// middleware
app.use("/api/v1/blog/*", async (c, next) => {
  const header = c.req.header("Authorization") || "";

  const token = header.split(" ")[1];

  const response = await verify(token, c.env.JWT_SECRET_KEY);

  if (response.id) {
    next();
  } else {
    c.status(403);
    return c.json({ error: "unauthorised" });
  }
});

app.post("/api/v1/signup", async (c) => {
  try {
    console.log("Database URL:", c.env.DATABASE_URL); // Debug log

    if (!c.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not defined");
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({
        error: "user not found",
      });
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET_KEY);

    return c.text(token);
  } catch (error) {
    console.error("Error during signup:", error);
    c.status(500);
    return c.json({
      error: "Failed to create user",
    });
  }
});

app.post("/api/v1/signin", async (c) => {
  try {
    if (!c.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not defined");
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({
        message: "Incorrect credentials",
      });
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET_KEY);
 
    return c.text(token);
  } catch (error) {
    console.error("Error during signup:", error);
    c.status(500);
    return c.json({
      error: "Failed to create user",
    });
  }
});

app.post("/api/v1/blog", (c) => {
  return c.text("Hello Hono!");
});

app.put("/api/v1/blog", (c) => {
  return c.text("Hello Hono!");
});

app.get("/api/v1/blog/:id", (c) => {
  return c.text("Hello Hono!");
});

export default app;
