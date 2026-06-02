import {
  useQuery,
  type UndefinedInitialDataOptions,
} from "@tanstack/react-query";
import { api } from "../api";
import type { Param } from "@/types/form/req.type";

export const useFetchAcademicYears = (
  params: Param | {} = {},
  options?: Omit<
    UndefinedInitialDataOptions<any, Error, any, any>,
    "queryKey" | "queryFn"
  >,
) => {
  const urlParams = new URLSearchParams(params).toString();

  return useQuery({
    ...options,
    queryKey: ["academic_years", params],
    queryFn: async () => {
      const res = await api.get(`/api/academic-years?${urlParams}`);
      return res.data;
    },
  });
};
