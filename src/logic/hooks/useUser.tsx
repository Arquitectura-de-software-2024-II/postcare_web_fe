import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/userManagementServices";

export const useUserData = () => {
    return useQuery({
      queryKey: ["userData"],
      queryFn: getUser,
      staleTime: Infinity,
    });
  };
  