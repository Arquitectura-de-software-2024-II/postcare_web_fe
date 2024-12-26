"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

type User = {
  id: string;
  autenticado: boolean;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    console.log(accessToken);
    if (accessToken) {
      // Verificar token en el backend
      axios
        .get("http://localhost:8000/auth/users/me/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setUser({ id: response.data.id_document, autenticado: true }); // Puedes agregar más datos si es necesario
        })
        .catch(() => {
          // Si el token no es válido, eliminarlo
          Cookies.remove("accessToken");
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
