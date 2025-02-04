import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createRecordOption,
  deleteRecordOption,
  deleteUserRecord,
  getRecordById,
  getRecordOptionById,
  getRecordOptions,
  getUserRecords,
  postUserRecords,
  updateRecordOption,
  updateUserRecord,
} from "../services/postoperationServices";

export const useRecordOptions = () => {
  return useQuery({
    queryKey: ["recordOptions"],
    queryFn: getRecordOptions,
    staleTime: Infinity,
  });
};

export const useUserRecords = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: ["userRecords", userId],
    queryFn: () => getUserRecords({ userId }),
    staleTime: Infinity,
  });
};

export const useGetRecordById = ({
  userId,
  recordId,
}: {
  userId: string;
  recordId: string;
}) => {
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
        queryKey: ["userRecords"],
      });
    },
  });
};

export const useUpdateRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userRecords"],
      });
    },
  });
};

export const useDeleteRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUserRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userRecords"],
      });
    },
  });
};

export const  useCreateRecordOption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRecordOption,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recordOptions"],
      });
    },
  });
};

export const useGetRecordOptionById = (recordOptionId:string) => {
  return useQuery({
    queryKey: ["singleRecordOption"],
    queryFn: () => getRecordOptionById(recordOptionId),
    staleTime: Infinity,
  });
};

export const useUpdateRecordOption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRecordOption,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['recordsOptions']
      })
    },
  })
}

export const useDeleteRecordOption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRecordOption,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['recordsOptions']
      })
    },
  })
};



