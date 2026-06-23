import type { AcademicYear } from "@/types/data/academic-year.type";
import { create } from "zustand";

type AcademicYearStore = {
  selectedYearId: string;
  yearLabel: string;
  yearStatus: string;
  academicYears: AcademicYear[];
  setYear: (id: string, label: string, status: string) => void;
  setAcademicYears: (data: AcademicYear[]) => void;
};

export const useAcademicYearStore = create<AcademicYearStore>((set) => ({
  selectedYearId: "",
  yearLabel: "",
  yearStatus: "",
  academicYears: [],
  setYear: (id, label, status) =>
    set({ selectedYearId: id, yearLabel: label, yearStatus: status }),
  setAcademicYears: (data) => set({ academicYears: data }),
}));
