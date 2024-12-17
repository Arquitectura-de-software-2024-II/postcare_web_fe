import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUser, signupRequest } from "@/services/auth";

export const useUser = () => {
  const token = typeof window !== "undefined" ? document.cookie.split("=")[1] : null;

  return useQuery({
    queryKey: ["user"],
    queryFn: () => token ? fetchUser(token) : Promise.reject("No token"),
    enabled: !!token, // Solo consulta si hay token
    staleTime: Infinity,
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  interface SignupResponse {
    token: string;
  }

  interface SignupError {
    message: string;
  }

  return useMutation({ 
    mutationFn: signupRequest, 
    onSuccess: (data:SignupResponse) => {
      // Guardar el token en cookies o localStorage
      document.cookie = `token=${data.token}; path=/`;

      // Opcional: Invalidate cache del usuario actual para recargar el estado
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: SignupError) => {
      console.error("Error al registrar:", error);
    },
  });
};