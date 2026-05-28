import { z } from "zod";

export const academicYearSchema = z.object({
  start_date: z.date(),
  end_date: z.date(),
  academic_year: z.string(),
});

export type AcademicYearData = z.infer<typeof academicYearSchema>;
