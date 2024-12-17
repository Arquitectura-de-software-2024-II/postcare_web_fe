"use client";

import Button from "@/components/Button/Button";
import TextField from "@/components/TextField/TextField";
import { useSurgeries } from "@/hooks/useSurgeries";
import { Operation } from "@/models/operation";
import { useEffect, useState } from "react";
import Loader from "../Loader";

export default function SurgeryForm() {
  const [surgeryOptions, setSurgeryOptions] = useState<Operation[]>([]);
  const [surgerySelected, setSurgerySelected] = useState<
    { id: string; name: string }[]
  >([]);

  const { data: surgeries, isLoading } = useSurgeries();

  useEffect(() => {
    if (surgeries) {
      const surgeriesOp = surgeries.map(
        (operation: { nombre: string; id: string; tipo: [] }) => ({
          name: operation.nombre,
          id: operation.id,
          type: operation.tipo.map((tipo: { id: string; nombre: string }) => ({
            id: tipo.id,
            name: tipo.nombre,
          })),
        })
      );
      setSurgeryOptions(surgeriesOp);
    }
  }, [surgeries]);

  return (
    <>
      <form>
        <TextField label="Fecha de la operación">
          <input type="date" name="fecha" />
        </TextField>
        <TextField label="Doctor">
          <input type="string" name="doctor" />
        </TextField>
        {isLoading ? (
          <Loader />
        ) : (
          <TextField label="Operación">
            <select
              name="tipo"
              onChange={(e) => {
                const selectedSurgery = surgeryOptions.find(
                  (option) => option.id === e.target.value
                );
                if (selectedSurgery) {
                  // Asegúrate de pasar solo un valor, no un objeto completo.
                  console.log(selectedSurgery.type);
                  setSurgerySelected(selectedSurgery.type);
                }
              }}
            >
              <option value="">Elija una opción</option>
              {surgeryOptions.map((surgery, index) => (
                <option key={index} value={surgery.id}>
                  {surgery.name}
                </option>
              ))}
            </select>
          </TextField>
        )}
        {surgerySelected && surgerySelected.length != 0 && (
          <TextField label="Operación">
            <select name="tipo">
              {surgerySelected.map((surgery2, index) => (
                <option key={index} value={index}>
                  {surgery2.name}
                </option>
              ))}
            </select>
          </TextField>
        )}
        <TextField label="Observaciones">
          <input type="text" name="observaciones" />
          </TextField >
        <Button>Guardar cirugía</Button>
      </form>
    </>
  );
}
