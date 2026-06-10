import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import type { FetcherOptions, Param } from "@/types/form/req.type";

export const useFetchResources = (
  params: Param | {} = {},
  options?: FetcherOptions,
) => {
  const urlParams = new URLSearchParams(params).toString();

  return useQuery({
    ...options,
    queryKey: ["resources", params],
    queryFn: async () => {
      const res = await api.get(`/api/resource-data?${urlParams}`);
      return res.data;
    },
  });
};
