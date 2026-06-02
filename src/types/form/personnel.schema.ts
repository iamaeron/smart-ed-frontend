import { z } from "zod";

export const personnelSchema = z
  .object({
    name: z.string().min(3, { error: "Name is too short." }),
    position: z.string().min(1),
    is_oic: z.string().min(1, { error: "Please select one." }),
    term_start: z.string().min(1, { error: "Please select a year." }),
    term_end: z.string().nullable(),
    current_term: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.current_term === "false") {
      if (!data.term_end || data.term_end.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Term end is required when it is not the current term.",
          path: ["term_end"],
        });
      }
    }
  });

export type PersonnelData = z.infer<typeof personnelSchema>;
