"use client";

import Button from "@/components/UI/button";
import Input from "@/components/UI/Input";
import { useCreateOperationOption, useUpdateOperationOption } from "@/logic/hooks/useOperations";
import { OperationOption } from "@/logic/models/operationModel";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

interface AdminOperationFormProps {
  mode?: "create" | "view" | "edit";
  operationOptionData?: OperationOption;
}

export default function AdminOperationForm({
  mode = "create",
  operationOptionData,
}: AdminOperationFormProps) {
  const { mutate: createOperationOption } = useCreateOperationOption();
  const { mutate: updateOperationOption } = useUpdateOperationOption();
  const [formData, setFormData] = useState<{
    id: string;
    nameOperation: string;
    types: string[];
  }>({
    id: "",
    nameOperation: "",
    types: [],
  });

  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    if (mode === "view" && operationOptionData) {
      setFormData({
        id: operationOptionData.id ? operationOptionData.id : "",
        nameOperation: operationOptionData.nombre
          ? operationOptionData.nombre
          : "",
        types: operationOptionData.tipo
          ? operationOptionData.tipo.map((tipo) => tipo.nombre)
          : [],
      });
      setTypes(
        operationOptionData.tipo
          ? operationOptionData.tipo.map((tipo) => tipo.nombre)
          : []
      );
    }
  }, [mode, operationOptionData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      id: "",
      nombre: formData.get("nameOperation") as string,
      tipo: types.map((type, index) => ({
        id: index.toString(),
        nombre: type,
      })),
    };
    console.log(data);
    if (mode === "create") {
      console.log(data);
      createOperationOption(data);
      redirect("/usuario/admin/procedimientosMedicos");
    } else if (mode === "edit") {
      data.id = operationOptionData?.id ? operationOptionData.id : "";
      updateOperationOption(data);
      redirect("/usuario/admin/procedimientosMedicos");
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

  const handleTypeChange = (index: number, value: string) => {
    setTypes((prev) => {
      const newTypes = [...prev];
      newTypes[index] = value;
      return newTypes;
    });
  };

  const addType = () => {
    setTypes((prev) => [...prev, ""]);
  };

  const removeType = (index: number) => {
    setTypes((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          label="Nombre de la operación*"
          name="nameOperation"
          id="nameOperation"
          value={formData.nameOperation}
          onChange={handleChange}
          disabled={mode == "view"}
        />
        <div className="flex items-center">
          <h6>Tipos</h6>
          {mode != "view" && (<FontAwesomeIcon
            icon={faPlus}
            className="py-1 ml-4 px-2 rounded-full bg-primaryColor text-backgroundColor text-xl cursor-pointer"
            onClick={addType}
          />)}
        </div>
        <div className="ml-6">
          {types.map((type, index) => (
            <div key={index} className="flex items-center ">
              <div className="flex-1">
                <Input
                  label={`Tipo ${index+1}`}
                  name={`typeOperation-${index}`}
                  id={`typeOperation-${index}`}
                  value={type}
                  onChange={(e) => handleTypeChange(index, e.target.value)}
                  disabled={mode == "view"}
                />
              </div>
              {mode != "view" && (
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-errorColor cursor-pointer h-5 w-5 mt-4 ml-2"
                  onClick={() => removeType(index)}
                />
              )}
            </div>
          ))}
        </div>
        {mode !== "view" && (
          <Button
            label={
              mode === "create" ? "Registrar operación" : "Guardar operación"
            }
            fullWidth={true}
            type="submit"
          />
        )}
      </form>
    </>
  );
}
