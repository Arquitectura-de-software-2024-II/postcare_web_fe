"use client";

import { useUser } from "@/app/util/UserProvider";
import Button from "@/components/UI/button";
import Input from "@/components/UI/Input";
import { useCreateNews, useUpdateNews } from "@/logic/hooks/useEducative";
// import { useCreateNews, useUpdateNews } from "@/logic/hooks/useNews";
import { newsInfo } from "@/logic/models/newsModel";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

interface AdminNewsFormProps {
  mode?: "create" | "view" | "edit";
  newsData?: newsInfo;
}

export default function AdminNewsForm({
  mode = "create",
  newsData,
}: AdminNewsFormProps) {
  const { user } = useUser();
  const { mutate: createNews } = useCreateNews();
  const { mutate: updateNews } = useUpdateNews();
  const [formData, setFormData] = useState<{
    id: string;
    title: string;
    content: string;
  }>({
    id: "",
    title: "",
    content: "",
  });

  useEffect(() => {
    if (mode === "view" && newsData) {
      setFormData({
        id: newsData.id ? newsData.id : "",
        title: newsData.title ? newsData.title : "",
        content: newsData.content ? newsData.content : "",
      });
    }
  }, [mode, newsData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data:newsInfo = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      author: user?.name ? user.name : "",
    };
    console.log(data);
    if (mode === "create") {
      // console.log(data);
      createNews(data);
      redirect("/usuario/admin/noticias");
    } else if (mode === "edit") {
      data.id = newsData?.id ? newsData.id : "";
      updateNews(data);
      redirect("/usuario/admin/noticias");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          label="Título de la noticia*"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          disabled={mode == "view"}
        />
        <div className="flex items-center">
          <h6>Contenido</h6>
        </div>
        <div className="ml-6">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            name="content"
            id="content"
            value={formData.content}
            onChange={handleChange}
            disabled={mode == "view"}
            rows={10}
          />
        </div>
        {mode !== "view" && (
          <Button
            label={mode === "create" ? "Registrar noticia" : "Guardar noticia"}
            fullWidth={true}
            type="submit"
          />
        )}
      </form>
    </>
  );
}