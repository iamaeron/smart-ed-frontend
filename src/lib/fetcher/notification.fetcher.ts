import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import type { FetcherOptions, Param } from "@/types/form/req.type";

export const useFetchNotifications = (
  params: Param | {} = {},
  options?: FetcherOptions,
) => {
  const urlParams = new URLSearchParams(params).toString();

  return useQuery({
    ...options,
    queryKey: ["notifications", params],
    queryFn: async () => {
      const res = await api.get(`/api/notifications?${urlParams}`);
      return res.data;
    },
  });
};
