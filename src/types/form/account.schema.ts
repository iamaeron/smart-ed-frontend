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

export type AccountData = z.infer<typeof accountSchema>;
