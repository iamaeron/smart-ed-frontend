import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(1, { message: "This field is required." }),
  password: z.string().min(1, { message: "This field is required." }),
});

export type UserData = z.infer<typeof userSchema>;
