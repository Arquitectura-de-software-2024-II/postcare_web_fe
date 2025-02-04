"use client";

import Button from "@/components/UI/button";
import Input from "@/components/UI/Input";
import { useCreateRecordOption } from "@/logic/hooks/useRecords";
import { RecordOptions, Symptom, VitalSign } from "@/logic/models/recordModel";
import { updateRecordOption } from "@/logic/services/postoperationServices";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

interface AdminRecordFormProps {
  mode?: "create" | "view" | "edit";
  recordOptionData?: RecordOptions;
}

export default function AdminRecordForm({
  mode = "create",
  recordOptionData,
}: AdminRecordFormProps) {
  const { mutate: createRecordOption } = useCreateRecordOption();
  const [formData, setFormData] = useState<{
    id: string;
    symptoms: Symptom[];
    vitalSigns: VitalSign[];
  }>({
    id: "",
    symptoms: [],
    vitalSigns: [],
  });

  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [vitalSigns, setVitalSigns] = useState<VitalSign[]>([]);

  useEffect(() => {
    if (mode === "view" && recordOptionData) {
      setFormData({
        id: recordOptionData.id ? recordOptionData.id : "",
        symptoms: recordOptionData.sintomas
          ? recordOptionData.sintomas.map((sintoma) => ({
              nombre: sintoma.nombre,
              escala: {
                min: sintoma.escala?.min,
                max: sintoma.escala?.max,
              },
            }))
          : [],
        vitalSigns: recordOptionData.signosVitales
          ? recordOptionData.signosVitales.map((signo) => ({
              nombre: signo.nombre,
              unidad: signo.unidad,
              rangoNormal: {
                min: signo.rangoNormal?.min,
                max: signo.rangoNormal?.max,
              },
            }))
          : [],
      });
      setSymptoms(
        recordOptionData.sintomas
          ? recordOptionData.sintomas.map((sintoma) => ({
              nombre: sintoma.nombre,
              escala: {
                min: sintoma.escala?.min,
                max: sintoma.escala?.max,
              },
            }))
          : []
      );
      setVitalSigns(
        recordOptionData.signosVitales
          ? recordOptionData.signosVitales.map((signo) => ({
              nombre: signo.nombre,
              unidad: signo.unidad,
              rangoNormal: {
                min: signo.rangoNormal?.min,
                max: signo.rangoNormal?.max,
              },
            }))
          : []
      );
    }
  }, [mode, recordOptionData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      id: formData.get("id") as string,
      nombre: formData.get("nameRecord") as string,
      sintomas: symptoms.map((symptom, index) => ({
        id: index.toString(),
        nombre: symptom.nombre,
        escala: {
          min: symptom.escala?.min,
          max: symptom.escala?.max,
        },
      })),
      signosVitales: vitalSigns.map((vitalSign, index) => ({
        id: index.toString(),
        nombre: vitalSign.nombre,
        unidad: vitalSign.unidad,
        rangoNormal: {
          min: vitalSign.rangoNormal?.min,
          max: vitalSign.rangoNormal?.max,
        },
      })),
    };
    console.log(data);
    if (mode === "create") {
      console.log(data);
      createRecordOption(data);
      // redirect("/usuario/admin/parametros");
    } else if (mode === "edit") {
      data.id = recordOptionData?.id ? recordOptionData.id : "";
      updateRecordOption(data);
      redirect("/usuario/admin/parametros");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSymptomChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    console.log(index, field, value);
    setSymptoms((prev) => {
      const newSymptoms = [...prev];
      if (field=="min"){
        newSymptoms[index] = { ...newSymptoms[index], escala: { ...newSymptoms[index].escala, [field]: typeof value === 'string' ? parseInt(value) : value } };
      }
      newSymptoms[index] = { ...newSymptoms[index], [field]: value };
      return newSymptoms;
    });
  };

  const handleVitalSignChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setVitalSigns((prev) => {
      const newVitalSigns = [...prev];
      newVitalSigns[index] = { ...newVitalSigns[index], [field]: value };
      return newVitalSigns;
    });
  };

  const addSymptom = () => {
    setSymptoms((prev) => [...prev, { nombre: "", valor: 0, min: 0, max: 0 }]);
  };

  const removeSymptom = (index: number) => {
    setSymptoms((prev) => prev.filter((_, i) => i !== index));
  };

  const addVitalSign = () => {
    setVitalSigns((prev) => [
      ...prev,
      { nombre: "", unidad: "", valor: 0, rangoNormal: { min: 0, max: 0 } },
    ]);
  };

  const removeVitalSign = (index: number) => {
    setVitalSigns((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          label="Nombre del registro*"
          name="id"
          id="id"
          value={formData.id}
          onChange={handleChange}
          disabled={mode == "view"}
        />
        <div className="flex items-center">
          <h6>Síntomas</h6>
          {mode != "view" && (
            <FontAwesomeIcon
              icon={faPlus}
              className="py-1 ml-4 px-2 rounded-full bg-primaryColor text-backgroundColor text-xl cursor-pointer"
              onClick={addSymptom}
            />
          )}
        </div>
        <div className="ml-6">
          {symptoms.map((symptom, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div >
                <div className="flex items-center space-x-2 flex-1">
                  <Input
                    label={`Nombre sintoma ${index + 1}`}
                    name={`symptom-${index}`}
                    id={`symptom-${index}`}
                    value={symptom.nombre}
                    onChange={(e) =>
                      handleSymptomChange(index, "nombre", e.target.value)
                    }
                    disabled={mode == "view"}
                  />
                  {mode != "view" && (
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-errorColor cursor-pointer h-5 w-5 mt-4 ml-2"
                      onClick={() => removeSymptom(index)}
                    />
                  )}
                </div>
                <div className="flex flex-row gap-4">
                  <Input
                    label="Valor mínimo"
                    type="number"
                    name={`symptom-min-${index}`}
                    id={`symptom-min-${index}`}
                    value={symptom.escala?.min?.toString() || ""}
                    onChange={(e) =>
                      handleSymptomChange(
                        index,
                        "min",
                        parseInt(e.target.value)
                      )
                    }
                    disabled={mode == "view"}
                  />
                  <Input
                    label="Valor máximo"
                    type="number"
                    name={`symptom-max-${index}`}
                    id={`symptom-max-${index}`}
                    value={symptom.escala?.max?.toString() || ""}
                    onChange={(e) =>
                      handleSymptomChange(
                        index,
                        "max",
                        parseInt(e.target.value)
                      )
                    }
                    disabled={mode == "view"}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <h6>Signos Vitales</h6>
          {mode != "view" && (
            <FontAwesomeIcon
              icon={faPlus}
              className="py-1 ml-4 px-2 rounded-full bg-primaryColor text-backgroundColor text-xl cursor-pointer"
              onClick={addVitalSign}
            />
          )}
        </div>
        <div className="ml-6">
          {vitalSigns.map((vitalSign, index) => (
            <div className="border-zinc-900 p-4" key={index}>
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <Input
                    label={`Nombre signo Vital ${index + 1}`}
                    name={`vitalSign-${index}`}
                    id={`vitalSign-${index}`}
                    value={vitalSign.nombre}
                    onChange={(e) =>
                      handleVitalSignChange(index, "nombre", e.target.value)
                    }
                    disabled={mode == "view"}
                  />
                </div>
                {mode != "view" && (
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-errorColor cursor-pointer h-5 w-5 mt-4 ml-2"
                    onClick={() => removeVitalSign(index)}
                  />
                )}
              </div>
              <div className="flex flex-row gap-4">
                <Input
                  label="Unidad"
                  name={`vitalSign-unit-${index}`}
                  id={`vitalSign-unit-${index}`}
                  value={vitalSign.unidad}
                  onChange={(e) =>
                    handleVitalSignChange(index, "unidad", e.target.value)
                  }
                  disabled={mode == "view"}
                />
                <Input
                  label="Min rango Normal"
                  name={`vitalSign-range-${index}`}
                  id={`vitalSign-range-${index}`}
                  value={vitalSign.rangoNormal?.max?.toString() || ""}
                  onChange={(e) =>
                    handleVitalSignChange(index, "rangoNormal", e.target.value)
                  }
                  disabled={mode == "view"}
                />
                <Input
                  label="Min rango normal"
                  name={`vitalSign-range-${index}`}
                  id={`vitalSign-range-${index}`}
                  value={vitalSign.rangoNormal?.min?.toString() || ""}
                  onChange={(e) =>
                    handleVitalSignChange(index, "rangoNormal", e.target.value)
                  }
                  disabled={mode == "view"}
                />
              </div>
            </div>
          ))}
        </div>
        {mode !== "view" && (
          <Button
            label={
              mode === "create" ? "Crear versión" : "Guardar registro"
            }
            fullWidth={true}
            type="submit"
          />
        )}
      </form>
    </>
  );
}
