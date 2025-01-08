"use client";

import InfoSkeleton from "@/components/UI/skeleton/InfoSkeleton";
import {
  useDeleteOperation,
  useGetOperationById,
} from "@/logic/hooks/useOperations";
import OperationForm from "./operationForm";
import { UserOperation } from "@/logic/models/operationModel";
import { useUser } from "@/app/util/UserProvider";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import NavForm from "@/components/UI/NavForm";

export default function EditOperationForm({
  operationId,
}: {
  operationId: string;
}) {
  const { user } = useUser();
  const {
    data: operationData,
    isLoading: loadingOperation,
    refetch,
  } = useGetOperationById({
    userId: user?.id || "",
    operationId: operationId,
  }) as { data: UserOperation; isLoading: boolean; refetch: () => void };
  const { mutate: deleteOperation } = useDeleteOperation();

  useEffect(() => {
    if (operationId) {
      refetch();
    }
  }, [operationId, refetch]);

  if (loadingOperation) {
    return <InfoSkeleton />;
  }

  const handleDeleteOperation = () => {
    if (user?.id && operationId) {
      deleteOperation({ userId: user.id, operationId: operationId });
    } else {
      console.log(user?.id, operationId);
      console.error("User ID or Operation ID is undefined");
    }
    redirect("/usuario/procedimientosMedicos");
  };

  return (
    <>
      <NavForm
        backLink="/usuario/procedimientosMedicos"
        title="Operación registrada"
        options={[
          { label: "Editar", onClick: () => console.log("Editar") },
          { label: "Eliminar", onClick: handleDeleteOperation },
        ]}
      />
      <OperationForm mode="view" operationData={operationData} />
    </>
  );
}
