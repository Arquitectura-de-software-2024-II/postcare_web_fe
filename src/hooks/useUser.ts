import { useQuery} from "@tanstack/react-query";
import { getUserOperations, getUserRecords } from "@/services/user";


export const useUserRecords = ({id}:{id:string}) => {
  return useQuery({
    queryKey: ["userRecords"],
    queryFn: () => getUserRecords({id}),
    staleTime: Infinity,
  });
};

export const useUserOperations = ({id}:{id:string}) => {
    return useQuery({
      queryKey: ["useOperations"],
      queryFn: () => getUserOperations({id}),
      staleTime: Infinity,
    });
};


