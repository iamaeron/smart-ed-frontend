import { z } from "zod";

export const personnelSchema = z.object({
  name: z.string().min(3, { error: "Name is too short." }),
  position: z.string().min(1),
  is_oic: z.string().min(1, { error: "Please select one." }),
  term_start: z.string().min(1, { error: "Please select a year." }),
  term_end: z.string(),
});

export type PersonnelData = z.infer<typeof personnelSchema>;
