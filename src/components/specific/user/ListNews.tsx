"use client";

import { useUser } from "@/app/util/UserProvider";
import Button from "@/components/UI/button";
import InfoSkeleton from "@/components/UI/skeleton/InfoSkeleton";
import { useGetNews } from "@/logic/hooks/useEducative";
import { newsInfo } from "@/logic/models/newsModel";
import { faCirclePlus, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function ListNews() {
  const { data: news, isLoading } = useGetNews();
  const { user } = useUser();

  if (isLoading || !news) {
    return <InfoSkeleton />;
  }

  if (!Array.isArray(news)) {
    return <div>Error cargando los datos</div>;
  }

  return (
    <>
       <div className="flex justify-between items-center">
        <h3 className="text-primaryColor text-3xl mb-4">Noticias:</h3>
        { user?.rol == "administrador" &&
          <Button
          label="Crear Noticia"
          leftIcon={<FontAwesomeIcon icon={faCirclePlus} />}
          navigate="/usuario/admin/noticias/crearNoticia"
        />
        }
        
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {news.map((newsItem: newsInfo) => (
          <Link href={`/usuario/admin/noticias/${newsItem.id}`} key={newsItem.id}>
          <div key={newsItem.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-row items-center mb-2">
              <FontAwesomeIcon
                icon={faNewspaper}
                className="text-3xl text-primaryColor mr-3"
              />
              <h3 className="text-xl font-semibold text-primaryColor">
                {newsItem.title}
              </h3>
            </div>
            <p className="text-gray-700 mb-2 line-clamp-2">{newsItem.content}</p>
            <p className="text-gray-500 text-sm">Autor: {newsItem.author}</p>
            <p className="text-gray-500 text-sm">
              Fecha:{" "}
              {newsItem.createdAt
                ? new Date(newsItem.createdAt).toLocaleDateString()
                : "Fecha no disponible"}
            </p>
          </div>
          </Link>
        ))}
      </div>
    </>
  );
}
