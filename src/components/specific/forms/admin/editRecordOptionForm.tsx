"use client";

import InfoSkeleton from "@/components/UI/skeleton/InfoSkeleton";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import NavForm from "@/components/UI/NavForm";
import Modal from "@/components/UI/Modal";
import Button from "@/components/UI/button";
import { useDeleteRecordOption, useGetRecordOptionById } from "@/logic/hooks/useRecords";
import { RecordOptions } from "@/logic/models/recordModel";
import AdminRecordOptionsForm from "./adminRecordOptionsForm";

export default function EditRecordOptionForm({
  recordOptionId,
}: {
    recordOptionId: string;
}) {
  const { mutate: deleteRecordOption } = useDeleteRecordOption();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const {isLoading: loadingRecordOption, data: recordOptionData, refetch} = useGetRecordOptionById(recordOptionId) as { data: RecordOptions; isLoading: boolean; refetch: () => void };; 


  useEffect(() => {
    if (recordOptionId) {
      refetch();
    }
  }, [recordOptionId, refetch]);

  if (loadingRecordOption) {
    return <InfoSkeleton />;
  }

  const handleDeleteRecordOption = () => {
    if (recordOptionId) {
      deleteRecordOption(recordOptionId);
    } else {
      console.error("User ID or RecordOption ID is undefined");
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
      <AdminRecordOptionsForm mode={isEditing? "edit": "view"} recordOptionData={recordOptionData} />
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
              onClick={handleDeleteRecordOption}
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
