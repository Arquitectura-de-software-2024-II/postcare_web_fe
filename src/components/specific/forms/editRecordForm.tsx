"use client";

import InfoSkeleton from "@/components/UI/skeleton/InfoSkeleton";


import { useUser } from "@/app/util/UserProvider";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import NavForm from "@/components/UI/NavForm";
import Modal from "@/components/UI/Modal";
import Button from "@/components/UI/button";
import { useDeleteRecord, useGetRecordById } from "@/logic/hooks/useRecords";
import { userRecord } from "@/logic/models/recordModel";
import RecordForm from "./recordForm";

export default function EditRecordForm({
  recordId,
}: {
  recordId: string;
}) {
  const { user } = useUser();
  const {
    data: recordData,
    isLoading: loadingRecord,
    refetch,
  } = useGetRecordById({
    userId: user?.id || "",
    recordId: recordId,
  }) as { data: userRecord; isLoading: boolean; refetch: () => void };
  const { mutate: deleteRecord } = useDeleteRecord();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (recordId) {
      refetch();
    }
  }, [recordId, refetch]);

  if (loadingRecord) {
    return <InfoSkeleton />;
  }

  const handleDeleteRecord = () => {
    console.log("recordID", recordId);
    if (user?.id && recordId) {
      deleteRecord({ userId: user.id, recordId: recordId });
    } else {
      console.log(user?.id, recordId);
      console.error("User ID or Record ID is undefined");
    }
    redirect("/usuario/registrosMedicos");
  };

  return (
    <>
      <NavForm
        backLink="/usuario/registrosMedicos"
        title="Registo creado"
        options={[
          { label: "Editar", onClick: () => console.log("Editar") },
          { label: "Eliminar", onClick: () => setDeleteModalOpen(true) },
        ]}
      />
      <RecordForm mode="view" recordData={recordData} />
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        type="popup"
        defaultDelete={true}
        content={"¿Estás seguro que deseas eliminar este registro?"}
        footerButtons={
          <>
            <Button
              label="Si, eliminar"
              color="error"
              onClick={handleDeleteRecord}
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
