"use client";

import Navbar from "@/components/layout/Navbar";
import { getUser } from "@/logic/services/userManagementServices";
import { useEffect } from "react";
import { useUser } from "../util/UserProvider";
import InfoSkeleton from "@/components/UI/skeleton/InfoSkeleton";

export default function UsuarioLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const {setUser, user} = useUser(); 

  useEffect(() => {
      const loadUser = async () => {
          const userData = await getUser(); // Llama a la función
          if (userData) {
              console.log(userData)
            setUser({
              name: userData.nombres,
              email: userData.email,
              id: userData.id,
              }); // Actualiza el estado del usuario
          }
        };
        loadUser();
    }, [setUser]);

    if (!user) {
      return <InfoSkeleton />;
    }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar role="user"/>
      <main className="flex-1 pt-20 flex justify-start items-center flex-col">
        {children}
      </main>
    </div>
  );
}
