import { z } from "zod";

export const schoolSchema = z.object({
  school_name: z.string().min(1, "Required").max(255),
  school_code: z.string().min(1, "Required").max(50),
  year_established: z.string(),
  school_type: z.string().nullable(),
  school_type_id: z.string().nullable(),
  school_head: z.string().min(1, "Required").max(255),
  position: z.string(),
  street: z.string().min(1, "Required").max(255),
  barangay: z.string().min(1, "Required").max(255),
  city: z.string().min(1, "Required").max(255),
  province: z.string().min(1, "Required").max(255),
  region: z.string().min(1, "Required").max(255),
  district: z.string().min(1, "Required").max(255),
  latitude: z.string().nullable(),
});

export type SchoolData = z.infer<typeof schoolSchema>;
