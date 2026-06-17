import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import type { FetcherOptions, Param } from "@/types/form/req.type";

export const useFetchKPI = (
  params: Param | {} = {},
  options?: FetcherOptions,
) => {
  const urlParams = new URLSearchParams(params).toString();

  return useQuery({
    ...options,
    queryKey: ["kpi", params],
    queryFn: async () => {
      const res = await api.get(`/api/kpi-data?${urlParams}`);
      return res.data;
    },
  });
};
