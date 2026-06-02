import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import type { FetcherOptions, Param } from "@/types/form/req.type";

export const useFetchDivisionLeadership = (
  params: Param | {} = {},
  options?: FetcherOptions,
) => {
  const urlParams = new URLSearchParams(params).toString();

  return useQuery({
    ...options,
    queryKey: ["division_leadership", params],
    queryFn: async () => {
      const res = await api.get(`/api/division-leaderships?${urlParams}`);
      return res.data;
    },
  });
};
