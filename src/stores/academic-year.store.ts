import type { AcademicYear } from "@/types/data/academic-year.type";
import { create } from "zustand";

type AcademicYearStore = {
  selectedYearId: string;
  yearLabel: string;
  academicYears: AcademicYear[];
  setYear: (id: string, label: string) => void;
  setAcademicYears: (data: AcademicYear[]) => void;
};

export const useAcademicYearStore = create<AcademicYearStore>((set) => ({
  selectedYearId: "",
  yearLabel: "",
  academicYears: [],
  setYear: (id, label) => set({ selectedYearId: id, yearLabel: label }),
  setAcademicYears: (data) => set({ academicYears: data }),
}));
