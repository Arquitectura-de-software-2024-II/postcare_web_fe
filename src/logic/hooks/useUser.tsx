import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, postDeleteAccount } from "../services/userManagementServices";
import { toast } from "react-toastify";
import { logout } from "../actions/logoutAction";

export const useUserData = () => {
    return useQuery({
      queryKey: ["userData"],
      queryFn: getUser,
      staleTime: Infinity,
    });
  };

  export const useDeleteAccount = (password:string) => {
    return useMutation({
      mutationFn: () => postDeleteAccount(password),
      onError: () => {
        toast.error("Hubo un error al eliminar la cuenta.");
      },
      onSuccess: () => {
        toast.success("Cuenta eliminada exitosamente.");
        logout();
      },
    })
  };
  
  