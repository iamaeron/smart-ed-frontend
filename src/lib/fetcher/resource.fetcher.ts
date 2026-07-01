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
    enabled: !!selectedYear,

    queryKey: ["resources", p],
    queryFn: async () => {
      const res = await api.get(`/api/resource-data?${urlParams}`);
      return res.data;
    },
  });
};

export const useFetchDashboardResources = (
  params: Param | {} = {},
  options?: FetcherOptions,
) => {
  // const selectedYear = useAcademicYearStore((state) => state.yearLabel);

  // const p = {
  //   academic_year: selectedYear,
  //   ...params,
  // };

  const urlParams = new URLSearchParams(params).toString();

  return useQuery({
    ...options,
    queryKey: ["dashboard_resources", params],
    queryFn: async () => {
      const res = await api.get(`/api/resource-data-dashboard?${urlParams}`);
      return res.data;
    },
  });
};
