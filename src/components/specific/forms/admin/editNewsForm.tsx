"use client";

import InfoSkeleton from "@/components/UI/skeleton/InfoSkeleton";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import NavForm from "@/components/UI/NavForm";
import Modal from "@/components/UI/Modal";
import Button from "@/components/UI/button";

import AdminNewsForm from "./adminNewsForm";
import { newsInfo } from "@/logic/models/newsModel";
import { useDeleteNews, useGetNewsById } from "@/logic/hooks/useEducative";

export default function EditNewsForm({
  newsId,
}: {
  newsId: string;
}) {
  const { mutate: deleteNews } = useDeleteNews();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { isLoading: loadingNews, data: newsData, refetch } = useGetNewsById(newsId) as { data: newsInfo; isLoading: boolean; refetch: () => void };

  useEffect(() => {
    if (newsId) {
      refetch();
    }
  }, [newsId, refetch]);

  if (loadingNews) {
    return <InfoSkeleton />;
  }

  const handleDeleteNews = () => {
    if (newsId) {
      deleteNews(newsId);
    } else {
      console.error("News ID is undefined");
    }
    redirect("/usuario/admin/noticias");
  };

  return (
    <>
      <NavForm
        backLink="/usuario/admin/noticias"
        title="Noticia creada"
        options={[
          { label: "Editar", onClick: () => setIsEditing(true) },
          { label: "Eliminar", onClick: () => setDeleteModalOpen(true) },
        ]}
      />
      <AdminNewsForm mode={isEditing ? "edit" : "view"} newsData={newsData} />
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        type="popup"
        defaultDelete={true}
        content={"¿Estás seguro que deseas eliminar esta noticia?"}
        footerButtons={
          <>
            <Button
              label="Si, eliminar"
              color="error"
              onClick={handleDeleteNews}
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