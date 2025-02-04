"use client";

import InfoSkeleton from "@/components/UI/skeleton/InfoSkeleton";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import NavForm from "@/components/UI/NavForm";
import Modal from "@/components/UI/Modal";
import Button from "@/components/UI/button";
import { useDeleteOperationOption, useGetOperationOptionById } from "@/logic/hooks/useOperations";
import AdminOperationOptionForm from "./adminOperationOptionForm";
import { OperationOption } from "@/logic/models/operationModel";

export default function EditOperationOptionForm({
  operationOptionId,
}: {
    operationOptionId: string;
}) {
  const { mutate: deleteOperationOption } = useDeleteOperationOption();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const {isLoading: loadingOperationOption, data: operationOptionData, refetch} = useGetOperationOptionById(operationOptionId) as { data: OperationOption; isLoading: boolean; refetch: () => void };; 


  useEffect(() => {
    if (operationOptionId) {
      refetch();
    }
  }, [operationOptionId, refetch]);

  if (loadingOperationOption) {
    return <InfoSkeleton />;
  }

  const handleDeleteOperationOption = () => {
    if (operationOptionId) {
      deleteOperationOption(operationOptionId);
    } else {
      console.error("User ID or OperationOption ID is undefined");
    }
    redirect("/usuario/admin/procedimientosMedicos");
  };

  return (
    <>
      <NavForm
        backLink="/usuario/admin/procedimientosMedicos"
        title="Operación creada"
        options={[
          { label: "Editar", onClick: () => setIsEditing(true)  },
          { label: "Eliminar", onClick: () => setDeleteModalOpen(true) },
        ]}
      />
      <AdminOperationOptionForm mode={isEditing? "edit": "view"} operationOptionData={operationOptionData} />
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        type="popup"
        defaultDelete={true}
        content={"¿Estás seguro que deseas eliminar esta operación?"}
        footerButtons={
          <>
            <Button
              label="Si, eliminar"
              color="error"
              onClick={handleDeleteOperationOption}
            />
            <Button
              label="No, cancelar"
              onClick={() => setDeleteModalOpen(false)}
            />
          </>
        }
      />
    </>
  );
}
