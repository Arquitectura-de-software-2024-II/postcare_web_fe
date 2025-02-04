import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNews, deleteNews, getNews, getNewsById, updateNews } from "../services/educativeServices";

export const useGetNews = () => {
  return useQuery({
    queryKey: ["listNews"],
    queryFn: getNews,
    staleTime: Infinity,
  });
};

export const useGetNewsById= (newsId: string) => {
  return useQuery({
    queryKey: ["listNewsId"],
    queryFn: () => getNewsById(newsId),
    staleTime: Infinity,
  });
};

export const useCreateNews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createNews,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['listNews']
      })
    },
  })
}

export const useDeleteNews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteNews,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['listNews']
      })
    },
  })
}

export const useUpdateNews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateNews,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['listNews']
      })
    },
  })
}