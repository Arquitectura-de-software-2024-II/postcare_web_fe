import { createParamsSymptom, createParamsVitalSign, createSurgeryOption, deleteOperationOption, deleteUserOperation, getOperationById, getOperationOptionById, getOperationsOptions, getUserOperations, postUserOperations, updateOperationOption, updateUserOperation } from "@/logic/services/postoperationServices";

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
        queryKey: ['userOperations']
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

export const useCreateOperationOption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSurgeryOption,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['operationsOptions']
      })
    },
  })
}

export const useUpdateOperationOption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOperationOption,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['operationsOptions']
      })
    },
  })
}

export const useGetOperationOptionById = (operationOptionId:string) => {
  return useQuery({
    queryKey: ["singleOperationOption"],
    queryFn: () => getOperationOptionById(operationOptionId),
    staleTime: Infinity,
  });
};

export const useDeleteOperationOption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteOperationOption,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['operationsOptions']
      })
    },
  })
};

export const useCreateParamsSymptom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createParamsSymptom,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['operationsOptions']
      })
    },
  })
}

export const useCreateParamsVitalSign = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createParamsVitalSign,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['operationsOptions']
      })
    },
  })
}

