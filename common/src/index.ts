import z from "zod";
export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(3).optional(),
});

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const createBlogIbput = z.object({
  title: z.string(),
  content: z.string(),
  published: z.date().optional(),
  readTime: z.string().optional(),
});

export const updateBlogIbput = z.object({
  title: z.string(),
  content: z.string(),
  id: z.number(),
  readTime: z.string().optional(),
});

// type inference in zod
export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signupInput>;
export type CreateBlogIbput = z.infer<typeof createBlogIbput>;
export type UpdateBlogIbput = z.infer<typeof updateBlogIbput>;
