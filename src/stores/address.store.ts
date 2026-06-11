import { create } from "zustand";
import provincesJson from "@/data/provinces.json";

type AddressStore = {
  provinceId: number | string;
  province: string;
  cityId: number | string;
  city: string;
  barangayId: number | string;
  barangay: string;
  provinces: { [k: string]: any }[];
  cities: { [k: string]: any }[];
  barangays: { [k: string]: any }[];
  setId: (key: string, val: any) => void;
};

export const useAddressStore = create<AddressStore>((set) => ({
  provinceId: 0,
  province: "",
  cityId: 0,
  city: "",
  barangayId: 0,
  barangay: "",
  provinces: [...provincesJson],
  cities: [],
  barangays: [...provincesJson],
  setId: (key: string, val: string) => set({ [key]: val }),
}));
