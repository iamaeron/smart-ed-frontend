import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import type { Param } from "@/types/form/req.type";

export const useFetchAcademicYears = (params: Param | {} = {}) => {
  const urlParams = new URLSearchParams(params).toString();

  return useQuery({
    queryKey: ["academic_years", params],
    queryFn: async () => {
      const res = await api.get(`/api/academic-years?${urlParams}`);
      return res.data;
    },
  });
};
