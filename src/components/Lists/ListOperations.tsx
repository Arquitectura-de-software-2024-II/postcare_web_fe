"use client";


import { useUser } from "@/context/userContext";
import { useUserOperations } from "@/hooks/useUser";
import { UserOperation} from "@/models/user";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ListOperations() {
  const { user } = useUser();
  const { data: operations, isLoading, refetch } = useUserOperations({ id: user?.id ?? "" });
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteOperation = async ( idCirugia: string) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`http://localhost:8081/api/pacientes/${user?.id}/cirugias/${idCirugia}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        toast.error("Error al eliminar la cirugía");
      }
      // Refetch operations after successful deletion
      toast.success("Cirugía eliminada correctamente");
      await refetch();
    } catch {
      toast.error("Error al eliminar la cirugía");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="mb-8">
      {isLoading ? (
        <div className="text-center text-gray-500">Cargando...</div>
      ) : (
        <div className="space-y-6">
          {operations && operations?.map((operation: UserOperation, index: string) => {
            const date = new Date(operation.fechaCirugia);
            const formattedDate = date.toLocaleDateString("es", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            const formattedTime = date.toLocaleTimeString("es", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });
  
            return (
              <div
                key={index}
                className="p-6 bg-white shadow-md rounded-lg border border-gray-300 flex justify-between items-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-gray-800">
                  <h3 className="text-lg font-semibold mb-2">
                    {operation.nombreCirugia}
                  </h3>
                  <p className="text-sm mb-1">
                    <span className="font-medium text-gray-600">Fecha: </span>
                    {formattedDate}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-medium text-gray-600">Hora: </span>
                    {formattedTime}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-medium text-gray-600">Médico: </span>
                    {operation.nombreMedico}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-medium text-gray-600">Tipo: </span>
                    {operation.tipoCirugia}
                  </p>
                  <p className="text-sm text-gray-700">
                  <span className="font-medium text-gray-600">Descripción: </span>
                    {operation.descripcion}
                  </p>
                </div>
                
                <button
                  onClick={() => deleteOperation(operation.id)}
                  className="text-white bg-red-200 hover:bg-red-600 font-medium px-4 py-2 rounded-md shadow-md disabled:opacity-50 transition-all duration-300"
                  disabled={isDeleting}
                >
                  🗑️
                </button>
              </div>
            );
          })}
          {operations && <p>Ninguna cirugia registrada aún</p>}
        </div>
      )}
    </div>
  );
}