import { useQuery } from "@tanstack/react-query";
import { getSurgeries } from "@/services/surgeries";

export const useSurgeries = () => {
  return useQuery({
    queryKey: ["surgeries"],
    queryFn: getSurgeries,
    staleTime: Infinity,
  });
};
