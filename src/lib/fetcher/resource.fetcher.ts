import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import type { FetcherOptions, Param } from "@/types/form/req.type";
import { useAcademicYearStore } from "@/stores/academic-year.store";

export const useFetchResources = (
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
    queryKey: ["resources", p],
    queryFn: async () => {
      const res = await api.get(`/api/resource-data?${urlParams}`);
      return res.data;
    },
  });
};
