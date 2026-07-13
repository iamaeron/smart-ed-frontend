import { z } from "zod";

export const schoolSchema = z.object({
  school_name: z.string().min(1, "Required").max(255),
  school_code: z
    .string()
    .regex(/^\d+$/, { message: "School code must contain only numbers." })
    .min(1, "Required")
    .max(50),
  year_established: z
    .string()
    .regex(/^\d+$/, { message: "Year must contain only numbers." })
    .min(4, "Year must be 4 digits."),
  school_type: z.string().nullable(),
  school_type_id: z.string().optional(),
  school_head: z
    .string({ error: "A school head is required." })
    .min(1, "Required")
    .max(255),
  position: z.string(),
  street: z.string().min(1, "Required").max(255),
  barangay: z.string().min(1, "Required").max(255),
  city: z.string().min(1, "Required").max(255),
  province: z.string().min(1, "Required").max(255),
  region: z.string().min(1, "Required").max(255),
  district: z.string().min(1, "Required").max(255),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  phone_number: z.string().optional(),
  email: z.string().optional(),
});

export type SchoolData = z.infer<typeof schoolSchema>;
