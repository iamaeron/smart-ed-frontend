import { z } from "zod";

export const academicYearSchema = z.object({
  start_date: z.coerce.date(),
  end_date: z.coerce.date(),
  academic_year: z.string(),
});

export type AcademicYearData = z.infer<typeof academicYearSchema>;

export type AcademicYearDataInput = z.input<typeof academicYearSchema>;
export type AcademicYearDataOutput = z.output<typeof academicYearSchema>;
