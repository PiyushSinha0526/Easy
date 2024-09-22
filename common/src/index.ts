import z from "zod";
export const signupInput = z.object({
  email: z
    .string()
    .email("Please enter a valid email address.")
    .min(1, "Email is required."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .min(1, "Password is required."),
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long.")
    .optional()
    .nullable(),
});

export const signinInput = z.object({
  email: z
    .string()
    .email("Please enter a valid email address.")
    .min(1, "Email is required."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .min(1, "Password is required."),
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
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogIbput = z.infer<typeof createBlogIbput>;
export type UpdateBlogIbput = z.infer<typeof updateBlogIbput>;
