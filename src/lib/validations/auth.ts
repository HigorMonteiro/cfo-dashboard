import { z } from "zod";

/**
 * Schema for validating login form data
 * @property {string} email - User's email address
 * @property {string} password - User's password
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(50, { message: "Password must not exceed 50 characters" }),
}); 