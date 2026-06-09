import { z } from "zod";

export const accountSchema = z.object({
  name: z
    .string()
    .min(1, { message: "This field is required." })
    .max(255, { message: "Name is too long." }),
  username: z
    .string()
    .min(1, { message: "This field is required." })
    .max(255, { message: "Username is too long." }),
  school: z.string(),
  role: z.string(),
  email: z.email().max(255, { message: "Email is too long." }),
  phone_number: z
    .string()
    .min(1, { message: "This field is required." })
    .max(15, { message: "Phone number is too long." }),
  password: z.string().min(8, { message: "This field is required." }),
  password_confirmation: z
    .string()
    .min(8, { message: "This field is required." }),
});

export const editAccountSchema = accountSchema.pick({
  username: true,
  name: true,
  email: true,
  phone_number: true,
});

export const accountPasswordSchema = z.object({
  new_pass: z.string().min(8, { message: "This field is required." }),
  confirm_new_pass: z.string().min(8, { message: "This field is required." }),
});

// TypeScript types (optional but recommended)
export type AccountData = z.infer<typeof accountSchema>;
export type EditAccountData = z.infer<typeof editAccountSchema>;
export type AccountPasswordData = z.infer<typeof accountPasswordSchema>;
