import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

type Param = {
  [k: string]: string;
};

export const useFetchActivityLogs = (params: Param | {} = {}) => {
  const urlParams = new URLSearchParams(params).toString();

  return useQuery({
    queryKey: ["activity_logs"],
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
