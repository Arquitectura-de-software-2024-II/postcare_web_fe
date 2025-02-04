"use client";

import Navbar from "@/components/layout/Navbar";
import { getUser} from "@/logic/services/userManagementServices";
import { useEffect } from "react";
import { useUser } from "../util/UserProvider";
import InfoSkeleton from "@/components/UI/skeleton/InfoSkeleton";
import { redirect } from "next/navigation";


export default function UsuarioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, user } = useUser();

  useEffect(() => {
    const loadUser = async () => {
      const userData = await getUser(); // Llama a la función
      // const res= await postVerifyToken();
      // console.log(res);
      if (userData) {
         console.log(userData);
        //  console.log(userData.user_rol.nombre);
        setUser({
          name: userData.nombres,
          email: userData.email,
          id: userData.id,
          rol: userData.user_rol?.nombre ?? "paciente",
        }); // Actualiza el estado del usuario
      }else{
        redirect("/auth/login");
      }
    };
    loadUser();
  }, [setUser]);

  if (!user) {
    return <InfoSkeleton />;
  }

  console.log(user);
  if (user.rol == "administrador"){
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar role="admin" />
        <main className="flex-1 pt-20 flex justify-start items-center flex-col">
          {children}
        </main>
      </div>);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar role="user" />
      <main className="flex-1 pt-20 flex justify-start items-center flex-col">
        {children}
      </main>
    </div>
  );
}
