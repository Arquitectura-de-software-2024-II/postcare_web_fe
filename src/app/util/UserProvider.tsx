"use client";

// import { getUser } from '@/logic/services/userManagementServices';
import { createContext, useContext, useState } from 'react';

// Crea el contexto
interface UserContextType {
  user: { id: string; name: string; email: string; rol: string} | null;
  setUser: React.Dispatch<React.SetStateAction<{ id: string; name: string; email: string; rol:string } | null>>;
}

const UserContext = createContext<UserContextType>({ user: null, setUser: () => {} });

// Proveedor del contexto
import { ReactNode } from 'react';

export  function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ id: string; name: string; email: string; rol:string } | null>(null);

  // useEffect(() => {
  //   const loadUser = async () => {
  //       const userData = await getUser(); // Llama a la función
  //       if (userData) {
  //           console.log(userData)
  //         setUser({
  //           name: userData.nombres,
  //           email: userData.email,
  //           id: userData.id,
  //           rol: userData.rol
  //           }); // Actualiza el estado del usuario
  //       }
  //     };
  
  //     loadUser();
  // }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useUser() {
  return useContext(UserContext);
}
