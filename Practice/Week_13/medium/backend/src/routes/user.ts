import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, decode, verify } from "hono/jwt";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  };
}>();

userRouter.post("/signup", async (c) => {
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

userRouter.post("/signin", async (c) => {
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
