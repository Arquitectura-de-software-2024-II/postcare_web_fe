"use client";

import Button from "@/components/Button/Button";
import TextField from "@/components/TextField/TextField";
import { useSurgeries } from "@/hooks/useSurgeries";
import { Key, useState } from "react";
import Loader from "../Loader";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/context/userContext";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { createUserOperations } from "@/services/user";

// import { useUserContext } from "@/context/userContext";


export default function SurgeryForm() {
  const [surgerySelected, setSurgerySelected] = useState<{ id: string; nombre: string }[]>([]);
  const { data: surgeries, isLoading } = useSurgeries();

  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Crear el objeto con los datos del formulario
    const formData = new FormData(e.currentTarget);
    // const fechaCirugia = formData.get("fechaCirugia");
    // const date = fechaCirugia ? new Date(fechaCirugia.toString()) : new Date();
    const data = {
      id: user?.id,
      fechaCirugia: "",
      nombreMedico: formData.get("nombreMedico"),
      nombreCirugia: formData.get("nombreCirugia"),
      tipoCirugia: formData.get("tipoCirugia"),
      descripcion: formData.get("descripcion"),
      idCirugia: "123"
    };

    try {
      const response = await fetch(`http://localhost:8081/api/pacientes/${user?.id}/cirugias`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await response.json();
        queryClient.invalidateQueries({ queryKey: ["useOperations"] });

        router.push(`/usuario`); 
      } else {
        toast.error("Error al guardar la cirugía");
      }
    } catch{
      toast.error("Error en la petición");
    }
  };


  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField label="Fecha de la operación">
          <input type="date" name="fechaCirugia" />
        </TextField>
        <TextField label="Doctor">
          <input type="string" name="nombreMedico" />
        </TextField>
        {isLoading ? (
          <Loader />
        ) : (
          <TextField label="Operación">
            <select
              name="nombreCirugia"
              onChange={(f) => {
                console.log(f.target.value);
                const selectedSurgery = surgeries.find(
                  (option: { nombre: string; }) => option.nombre === f.target.value
                );
                if (selectedSurgery) {
                  console.log(selectedSurgery.tipo);
                  setSurgerySelected(selectedSurgery.tipo);
                }
              }}
            >
              <option value="">Elija una opción</option>
              {surgeries?.map((operation: { nombre: string; id: string; tipo: [] }, index: Key | null | undefined) => (
                <option key={index} value={operation.nombre}>
                  {operation.nombre}
                </option>
              ))}
            </select>
          </TextField>
        )}
        {surgerySelected && surgerySelected.length != 0 && (
          <TextField label="Tipo de operación">
            <select name="tipoCirugia">
              {surgerySelected?.map((surgery2, index) => (
                <option key={index} value={surgery2.nombre}>
                  {surgery2.nombre}
                </option>
              ))}
            </select>
          </TextField>
        )}
        <TextField label="Observaciones">
          <input type="text" name="descripcion" />
          </TextField >
        <Button type="submit">Guardar cirugía</Button>
      </form>
    </>
  );
}
