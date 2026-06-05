import { z } from "zod";

export const announcementSchema = z.object({
  title: z
    .string()
    .min(1, { error: "This field is required." })
    .max(255, { error: "Title is too long." }),
  description: z.string().min(1, { error: "This field is required." }),
  type: z.enum(["dashboard", "public"]),
  image: z.string().optional(),
});

export type AnnouncementData = z.infer<typeof announcementSchema>;
