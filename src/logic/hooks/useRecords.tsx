import { useQuery } from "@tanstack/react-query";
import { getRecordOptions, getUserRecords } from "../services/postoperationServices";

export const useRecordOptions = () => {
  return useQuery({
    queryKey: ["recordOptions"],
    queryFn: getRecordOptions,
    staleTime: Infinity,
  });
};


export const useRecords = () => {
    return useQuery({
      queryKey: ["userRecords"],
      queryFn: () => getUserRecords({userId:"1"}),
      staleTime: Infinity,
    });
  };