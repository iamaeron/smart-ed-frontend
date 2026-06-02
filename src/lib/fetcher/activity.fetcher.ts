import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import type { FetcherOptions, Param } from "@/types/form/req.type";

export const useFetchActivityLogs = (
  params?: Param | Record<string, any>,
  options?: FetcherOptions,
) => {
  const urlParams = new URLSearchParams(params).toString();

  return useQuery({
    ...options,
    queryKey: ["activity_logs", params],
    queryFn: async () => {
      const res = await api.get(`/api/activity-logs?${urlParams}`);
      return res.data;
    },
  });
};

export const useFetchRecentActivityLogs = () => {
  return useQuery({
    queryKey: ["recent_activity_logs"],
    queryFn: async () => {
      const res = await api.get(`/api/activity-logs/recent`);
      return res.data;
    },
  });
};
