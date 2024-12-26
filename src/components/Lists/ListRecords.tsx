"use client";

import { useUser } from "@/context/userContext";
import { useUserRecords } from "@/hooks/useUser";
import { SignoVital, Sintoma, SintomaNoListado } from "@/models/record";
import { UserRecord } from "@/models/user";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ListRecords() {
  
  const { user } = useUser();
  const { data: records, isLoading, refetch } = useUserRecords({ id: user?.id ?? "" });

    const [isDeleting, setIsDeleting] = useState(false);
  
    const deleteRecord = async ( idRegistro: string) => {
      setIsDeleting(true);
      try {
        const response = await fetch(`http://localhost:8081/api/pacientes/${user?.id}/registros/${idRegistro}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          toast.error("Error al eliminar el registro");
        }
        // Refetch operations after successful deletion
        toast.success("Registro eliminado correctamente");
        await refetch();
      } catch {
        toast.error("Error al eliminar el registro");
      } finally {
        setIsDeleting(false);
      }
    };

  return (
    <div>
      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        <div className="space-y-4">
          {records && records?.map((record: UserRecord) => {
            const date = new Date(record.fechaRegistro);
            const formattedDate = date.toLocaleDateString("es", {year: "numeric",month: "long",day: "numeric",});
            const formattedTime = date.toLocaleTimeString("es", {hour: "2-digit", minute: "2-digit",hour12: true,});
            return(
            <div
              key={record.id}
              className="p-4 bg-white shadow-lg rounded-lg border border-gray-200"
            >
              <div className="text-lg font-semibold text-gray-800 mb-2">
                <p>{formattedDate}</p>
                <p>{formattedTime}</p>
              </div>
              {record.parametrosControl?.signosVitales?.length > 0 && (
                <div>
                
                  {record.parametrosControl?.signosVitales?.map(
                    (signo: SignoVital, index: number) => (
                      <p key={index} className="text-gray-600">
                        <span className="font-semibold">{signo.nombre}:</span>{" "}
                        {signo.valor} {signo.unidad}
                      </p>
                    )
                  )}
                </div>
              )}
              {record.parametrosControl?.sintomas?.length > 0 && (
                <div>
                  {record.parametrosControl?.sintomas?.map(
                    (sintoma: Sintoma, index: number) => (
                      <p key={index} className="text-gray-600">
                        <span className="font-semibold">{sintoma.nombre}:</span>{" "}
                        {sintoma.valor}
                      </p>
                    )
                  )}
                </div>
              )}
              {record.parametrosControl?.sintomasNoListados?.length > 0 && (
                <div>
                  {record.parametrosControl?.sintomasNoListados?.map(
                    (sintoma: SintomaNoListado, index: number) => (
                      <p key={index} className="text-gray-600">
                        <span className="font-semibold">{sintoma.nombre}:</span>{" "}
                        {sintoma.descripcion}
                      </p>
                    )
                  )}
                </div>
              )}
              <button
                  onClick={() => deleteRecord(record.id)}
                  className="text-white bg-red-200 hover:bg-red-600 font-medium px-4 py-2 rounded-md shadow-md disabled:opacity-50 transition-all duration-300"
                  disabled={isDeleting}
                >
                  🗑️
                </button>
            </div>
          );
          })}
          {records?.length === 0 && <p>Ningun registro creado aún</p>}
        </div>
      )}
    </div>
  );
}
