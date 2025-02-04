"use client";

import Input from "@/components/UI/Input";
import InfoSkeleton from "@/components/UI/skeleton/InfoSkeleton";
import { useUserData } from "@/logic/hooks/useUser";

export default function UserInfo() {

    const {data: user, isLoading} = useUserData();

    if (isLoading || !user) {
        return <InfoSkeleton/>
    }

  return (
    <>
    <h3 className="text-primaryColor text-3xl">Información usuario:</h3>
      <Input label="Nombres:" value={user.nombres} disabled/>
      <Input label="Apellidos:" value={user.apellidos} disabled/>
      <Input label="Correo:" value={user.email} disabled/>
      <Input label="Tipo de documento:" value={user.tipo_documento} disabled/>
      <Input label="Documento de identidad:" value={user.id_documento} disabled/>
      </>
  );
}
