import { z } from "zod";

export const academicYearSchema = z.object({
  start_date: z
    .any()
    .refine((val) => val !== undefined && val !== null && val !== "", {
      message: "Start date is required",
    })
    .transform((val) => new Date(val)),

  end_date: z
    .any()
    .refine((val) => val !== undefined && val !== null && val !== "", {
      message: "End date is required",
    })
    .transform((val) => new Date(val)),

  academic_year: z.string().optional(),
});

// This creates one unified type that plays nicely with both the inputs and outputs
export type AcademicYearData = z.infer<typeof academicYearSchema>;
