import type { AcademicYear } from "@/types/data/academic-year.type";
import { create } from "zustand";

type AcademicYearStore = {
  selectedYearId: string;
  yearLabel: string;
  academicYears: AcademicYear[];
  setYearId: (value: any) => void;
  setLabel: (label: any) => void;
  setAcademicYears: (data: any) => void;
};

export const useAcademicYearStore = create<AcademicYearStore>((set) => ({
  selectedYearId: "",
  yearLabel: "",
  academicYears: [],
  setYearId: (value: any) => set({ selectedYearId: value }),
  setLabel: (label: any) => set({ yearLabel: label }),
  setAcademicYears: (data: any) => set({ academicYears: data }),
}));
