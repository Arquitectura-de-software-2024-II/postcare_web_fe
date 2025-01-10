import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUserRecord, getRecordById, getRecordOptions, getUserRecords, postUserRecords, updateUserRecord } from "../services/postoperationServices";

export const useRecordOptions = () => {
  return useQuery({
    queryKey: ["recordOptions"],
    queryFn: getRecordOptions,
    staleTime: Infinity,
  });
};


export const useUserRecords = ({ userId }: {userId:string}) => {
    return useQuery({
      queryKey: ["userRecords", userId],
      queryFn: () => getUserRecords({userId}),
      staleTime: Infinity,
    });
  };

  
  export const useGetRecordById = ({userId, recordId}:{userId: string, recordId: string}) => {
    return useQuery({
      queryKey: ["userSingleRecord", userId],
      queryFn: () => getRecordById({ userId, recordId }),
      staleTime: Infinity,
    });
  };
  
  export const useCreateRecord = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: postUserRecords,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['userRecords']
        })
      },
    })
  };
  
  export const useUpdateRecord = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: updateUserRecord,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['userRecords','userSingleRecord']
        })
      },
    })
  };
  
  export const useDeleteRecord = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: deleteUserRecord,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['userRecords']
        })
      },
    })
  };