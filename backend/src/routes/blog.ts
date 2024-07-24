import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogIbput, updateBlogIbput } from "@alone_npm/easy-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  if (c.req.path.includes("/bulk")) {
    return next();
  }
  const header = c.req.header("authorization") || "";
  try {
    const response = await verify(header, c.env.JWT_SECRET);
    if (response.id) {
      c.set("userId", response.id);
      await next();
    } else {
      c.status(403);
      return c.json({
        error: "unauthorized: you are not logged in",
      });
    }
  } catch (error) {
    c.status(403);
    return c.json({
      error: "you are not logged in",
    });
  }
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = createBlogIbput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct",
    });
  }
  const userId = c.get("userId");
  if (!userId) {
    c.status(401);
    return c.json({
      message: "Unauthorized: No user ID found",
    });
  }
  const { title, content, readTime } = body;
  if (!title.trim() || !content.trim()) {
    c.status(411);
    return c.json({
      message: "Title or content, must not be empty",
    });
  }
  const blog = await prisma.post.create({
    data: {
      title,
      content,
      readTime,
      authorId: userId,
    },
  });
  return c.json({
    data: blog,
  });
});

blogRouter.patch("/:id/edit", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param("id");
  const body = await c.req.json();
  const { success } = updateBlogIbput.safeParse({...body, id: Number(id)});
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct",
    });
  }
  const userId = c.get("userId");
  if (!userId) {
    c.status(401);
    return c.json({
      message: "Unauthorized: No user ID found",
    });
  }
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });
  if (!post) {
    c.status(404);
    return c.json({ message: "Post not found." });
  }
  if (post.authorId !== userId) {
    c.status(403);
    return c.json({
      message: "Forbidden: You do not have permission to edit this post.",
    });
  }
  const { title, content, readTime } = body;
  if (!title.trim() || !content.trim()) {
    c.status(411);
    return c.json({
      message: "Title or content must not be empty",
    });
  }
  const blog = await prisma.post.update({
    where: { id: Number(id) },
    data: {
      title,
      content,
      readTime,
    },
  });
  return c.json({
    data: blog,
  });
});

// blogRouter.put("/", async (c) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());
//   const body = await c.req.json();
//   const { success } = updateBlogIbput.safeParse(body);
//   if (!success) {
//     c.status(411);
//     return c.json({
//       message: "Inputs not correct",
//     });
//   }
//   const blog = await prisma.post.update({
//     where: {
//       id: body.id,
//     },
//     data: {
//       title: body.title,
//       content: body.content,
//       readTime: body.readTime,
//     },
//   });
//   return c.json({
//     data: blog,
//   });
// });

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blog = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      published: true,
      readTime: true,
      id: true,
      author: {
        select: { name: true, id: true },
      },
    },
  });
  return c.json({
    data: blog,
  });
});

blogRouter.get("/user-posts", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const userId = c.get("userId");
  if (!userId) {
    c.status(401);
    return c.json({
      message: "Unauthorized: No user ID found",
    });
  }
  const blog = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      readTime: true,
      author: {
        select: { name: true, id: true },
      },
    },
  });
  return c.json({
    data: blog,
  });
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param("id");
  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: Number(id),
      },
      select: {
        content: true,
        title: true,
        id: true,
        published: true,
        readTime: true,
        author: {
          select: { name: true, id: true },
        },
      },
    });
    return c.json({
      data: blog,
    });
  } catch (error) {
    c.status(411);
    return c.json({ message: "Error while fetching blog post" });
  }
});
