import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import type { FetcherOptions, Param } from "@/types/form/req.type";

export const useFetchUserAccounts = (
  params: Param | {} = {},
  options?: FetcherOptions,
) => {
  const urlParams = new URLSearchParams(params).toString();

  return useQuery({
    ...options,
    queryKey: ["user_accounts", params],
    queryFn: async () => {
      const res = await api.get(`/api/users?${urlParams}`);
      return res.data;
    },
  });
};
