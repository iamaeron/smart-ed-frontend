import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import type { FetcherOptions, Param } from "@/types/form/req.type";
import { useAcademicYearStore } from "@/stores/academic-year.store";

export const useFetchSubmissions = (
  params: Param | {} = {},
  options?: FetcherOptions,
) => {
  const selectedYear = useAcademicYearStore((state) => state.yearLabel);

  const p = {
    academic_year: selectedYear,
    ...params,
  };
  const urlParams = new URLSearchParams(p).toString();

  return useQuery({
    ...options,
    enabled: options?.enabled || !!selectedYear,
    queryKey: ["submissions", params],
    queryFn: async () => {
      const res = await api.get(`/api/submissions?${urlParams}`);
      return res.data;
    },
  });
};

export const useFetchSubmission = (
  id: string,
  params: Param | {} = {},
  options?: FetcherOptions,
) => {
  const urlParams = new URLSearchParams(params).toString();

  return useQuery({
    ...options,
    queryKey: ["submission", id, params],
    queryFn: async () => {
      const res = await api.get(`/api/submissions/${id}?${urlParams}`);
      return res.data;
    },
  });
};
