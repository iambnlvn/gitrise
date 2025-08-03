//todo: rewrite this

import { email, string, object, z } from "zod";
export const loginSchema = object({
  email: email("Please enter a valid email address"),
  password: string().min(8, "Password must be at least 8 characters long"),
});
export const signupSchema = object({
  email: email("Please enter a valid email address"),
  password: string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    ),
  username: string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be less than 20 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Username can only contain letters, numbers, hyphens, and underscores",
    ),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
