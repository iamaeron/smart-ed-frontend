import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import type { FetcherOptions, Param } from "@/types/form/req.type";

export const useFetchAnnouncements = (
  params: Param | {} = {},
  options?: FetcherOptions,
) => {
  const urlParams = new URLSearchParams(params).toString();

  return useQuery({
    ...options,
    queryKey: ["announcements", params],
    queryFn: async () => {
      const res = await api.get(`/api/announcements?${urlParams}`);
      return res.data;
    },
  });
};
