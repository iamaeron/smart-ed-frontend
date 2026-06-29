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
  street: string;
  region: string;
  coordinates: [number, number];
  district: string;
  isPinDraggable: boolean;
  setId: (key: string, val: any) => void;
  resetAddress: () => void;
};

const initialStore: Omit<AddressStore, "setId" | "resetAddress"> = {
  provinceId: 0,
  province: "",
  cityId: 0,
  city: "",
  barangayId: 0,
  barangay: "",
  provinces: [...provincesJson],
  cities: [],
  street: "",
  region: "",
  district: "",
  coordinates: [15.04, 120.6667],
  barangays: [...provincesJson],
  isPinDraggable: false,
};

export const useAddressStore = create<AddressStore>((set) => ({
  ...initialStore,
  setId: (key, val) => set({ [key]: val }),
  resetAddress: () => {
    set({});
  },
}));
