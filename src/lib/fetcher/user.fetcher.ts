import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

type Param = {
  [k: string]: string;
};

export const useFetchUserAccounts = (params: Param | {} = {}) => {
  const urlParams = new URLSearchParams(params).toString();

  return useQuery({
    queryKey: ["user_accounts"],
    queryFn: async () => {
      const res = await api.get(`/api/users?${urlParams}`);
      return res.data;
    },
  });
};
