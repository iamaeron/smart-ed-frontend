import { createStore } from "zustand";

export type User = {
  name: string;
  role: any;
  school: School;
  username: string;
  email: string;
  password: string;
  phone_number: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type School = {
  id: number;
  school_name: string;
  school_code: string;
};

export type AuthStoreData = {
  user: User | null;
  setUser: (val: User | null) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
};

export const authStore = createStore<AuthStoreData>((set) => ({
  user: null,
  setUser: (val: User | null) => set({ user: val }),
  isLoading: true,
  setIsLoading: (val: boolean) => set({ isLoading: val }),
}));
