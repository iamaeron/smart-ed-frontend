import { create } from "zustand";

type AcademicYearStore = {
  selectedYear: string;
  setYear: (value: any) => void;
};

export const useAcademicYearStore = create<AcademicYearStore>((set) => ({
  selectedYear: "",
  setYear: (value: any) => set({ selectedYear: value }),
}));
