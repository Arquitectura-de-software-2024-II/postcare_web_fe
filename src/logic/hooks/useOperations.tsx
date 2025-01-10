import { deleteUserOperation, getOperationById, getOperationsOptions, getUserOperations, postUserOperations, updateUserOperation } from "@/logic/services/postoperationServices";

import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useOperationsOptions = () => {
  return useQuery({
    queryKey: ["operationsOptions"],
    queryFn: getOperationsOptions,
    staleTime: Infinity,
  });
};

export const useUserOperations = ({ userId }: {userId:string}) => {
  return useQuery({
    queryKey: ["userOperations", userId],
    queryFn: () => getUserOperations({ userId }),
    staleTime: Infinity,
  });
};

export const useGetOperationById = ({userId, operationId}:{userId: string, operationId: string}) => {
  return useQuery({
    queryKey: ["userSingleOperation", userId],
    queryFn: () => getOperationById({ userId, operationId }),
    staleTime: Infinity,
  });
};

export const useCreateOperation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postUserOperations,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userOperations']
      })
    },
  })
};

export const useUpdateOperation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserOperation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userOperations','userSingleOperation']
      })
    },
  })
};

export const useDeleteOperation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUserOperation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userOperations']
      })
    },
  })
};