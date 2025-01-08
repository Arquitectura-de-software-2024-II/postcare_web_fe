"use client";

import { useUser } from "@/app/util/UserProvider";
import Button from "@/components/UI/button";
import Input from "@/components/UI/Input";
import Spinner from "@/components/UI/Spinner";
import {
  useCreateOperation,
  useOperationsOptions,
  useUpdateOperation,
} from "@/logic/hooks/useOperations";
import {
  OperationOption,
  OperationType,
  UserOperation,
} from "@/logic/models/operationModel";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

interface OperationFormProps {
  mode?: "create" | "view" | "edit";
  operationData?: UserOperation;
}

export default function OperationForm({
  mode = "create",
  operationData,
}: OperationFormProps) {
  const { user } = useUser();

  const [editing, setEditing] = useState(mode === "view" ? false : true);
  const [operationSelected, setOperationSelected] = useState<OperationType[]>(
    []
  );
  const { data: operationOptions, isLoading: loadingOptions } =
    useOperationsOptions() as { data: OperationOption[]; isLoading: boolean };

  const { mutate: createOperation } = useCreateOperation();
  const { mutate: updateOperation } = useUpdateOperation();
  const [formData, setFormData] = useState({
    id: "",
    nameOperation: "",
    typeOperation: "",
    doctorName: "",
    observations: "",
    idOperation: "",
    dateOperation: "",
  });

  useEffect(() => {
    if (mode === "view" && operationData) {
      setFormData({
        id: operationData.id ? operationData.id : "",
        nameOperation: operationData.nombreCirugia
          ? operationData.nombreCirugia
          : "",
        typeOperation: operationData.tipoCirugia
          ? operationData.tipoCirugia
          : "",
        doctorName: operationData.nombreMedico
          ? operationData.nombreMedico
          : "",
        observations: operationData.descripcion
          ? operationData.descripcion
          : "",
        idOperation: operationData.idCirugia ? operationData.idCirugia : "",
        dateOperation: operationData.fechaCirugia
          ? operationData.fechaCirugia
          : "",
      });
    }
    console.log(operationData);
    if (operationOptions) {
      console.log(operationOptions);
      const selectedOperation = operationOptions.find(
        (option: { nombre: string }) =>
          option.nombre === operationData?.nombreCirugia
      );
      console.log(selectedOperation);
      if (selectedOperation) {
        setOperationSelected(selectedOperation.tipo);
      } else {
        setOperationSelected([]);
      }
    }
  }, [mode, operationData, operationOptions]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = {
        fechaCirugia: (formData.get("dateOperation") as string)+"T00:00:00.000Z",
        nombreCirugia: formData.get("nameOperation") as string,
        tipoCirugia: formData.get("typeOperation") as string,
        nombreMedico: formData.get("doctorName") as string,
        descripcion: formData.get("observations") as string,
        idCirugia: "",
        userId: user?.id,
      };
      console.log(data);
      if (mode === "create") {
        console.log(data);
        createOperation(data);
        redirect("/usuario/procedimientosMedicos");
      } else if (mode === "view") {
        // data.id = "";
        updateOperation(data);
      }
      
    
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
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
          label="Fecha de la Operación*"
          name="dateOperation"
          id="dateOperation"
          type="date"
          value={formData.dateOperation}
          onChange={handleChange}
          disabled={!editing}
        />
        {loadingOptions ? (
          <Spinner />
        ) : (
          <Input
            label="Nombre Operación*"
            name="nameOperation"
            id="nameOperation"
            disabled={loadingOptions || !editing}
            value={formData.nameOperation}
            onChange={(f) => {
              const selectedOperation = operationOptions.find(
                (option: { nombre: string }) => option.nombre === f.target.value
              );
              handleChange(f);
              if (selectedOperation) {
                setOperationSelected(selectedOperation.tipo);
              } else {
                setOperationSelected([]);
              }
            }}
            options={operationOptions.map((operation: OperationOption) => ({
              value: operation.nombre,
              label: operation.nombre, // Puedes modificar este campo si necesitas otro texto
            }))}
          />
        )}
        {operationSelected.length > 0 && (
          <Input
            label="Tipo de Operación*"
            name="typeOperation"
            id="typeOperation"
            options={operationSelected.map((operationType) => ({
              value: operationType.nombre,
              label: operationType.nombre,
            }))}
            onChange={handleChange}
            value={formData.typeOperation}
            disabled={!editing}
          />
        )}
        <Input
          label="Nombre del médico que realizó la operación"
          type="text"
          name="doctorName"
          id="doctorName"
          placeholder="Andres Mora"
          value={formData.doctorName}
          onChange={handleChange}
          disabled={!editing}
        />
        <Input
          label="Observaciones adicionales"
          type="text"
          name="observations"
          id="observations"
          placeholder="..."
          value={formData.observations}
          onChange={handleChange}
          disabled={!editing}
        />
        {(mode !== "view" || editing) && (
          <Button
            label={
              mode === "create" ? "Registrar operación" : "Guardar operación"
            }
            fullWidth={true}
            type="submit"
          />
        )}
      </form>
      {mode === "view" && !editing && (
        <Button
          label={"Editar operación"}
          fullWidth={true}
          onClick={handleEdit}
          type="button"
        />
      )}
    </>
  );
}
