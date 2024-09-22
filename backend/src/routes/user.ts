import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupInput, signinInput } from "@alone_npm/easy-common";
import bcryptjs from "bcryptjs";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();

    const result = signupInput.safeParse(body);
    if (!result.success) {
      c.status(400);
      return c.json({ message: "Invalid input data" });
    }

    const hashedPassword = await bcryptjs.hash(result.data.password, 10);

    const userData: any = {
      email: result.data.email,
      password: hashedPassword,
    };

    if (result.data.name) {
      userData.name = result.data.name;
    }

    const user = await prisma.user.create({
      data: userData,
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      email: user.email,
      name: user.name || null,
      id: user.id,
      jwt: token,
    });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: "Something went wrong" });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();

    const result = signinInput.safeParse(body);
    if (!result.success) {
      c.status(400);
      return c.json({ message: "Invalid input data" });
    }

    const user = await prisma.user.findUnique({
      where: { email: result.data.email },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "User not found" });
    }

    const isPasswordValid = await bcryptjs.compare(
      result.data.password,
      user.password
    );

    if (!isPasswordValid) {
      c.status(401);
      return c.json({ error: "Invalid credentials" });
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      email: user.email,
      name: user.name,
      id: user.id,
      jwt: token,
    });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: "Something went wrong" });
  }
});
