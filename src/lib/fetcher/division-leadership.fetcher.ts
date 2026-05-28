import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import type { Param } from "@/types/form/req.type";

export const useFetchDivisionLeadership = (params: Param | {} = {}) => {
  const urlParams = new URLSearchParams(params).toString();

  return useQuery({
    queryKey: ["division_leadership", params],
    queryFn: async () => {
      const res = await api.get(`/api/division-leaderships?${urlParams}`);
      return res.data;
    },
  });
};
