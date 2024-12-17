import { useQuery } from "@tanstack/react-query";
import { getParameters } from "@/services/parameters";

export const useParameters = () => {
  return useQuery({
    queryKey: ["params"],
    queryFn: getParameters,
    staleTime: Infinity,
  });
};
