"use client";

import { useUser } from "@/app/util/UserProvider";
import Button from "@/components/UI/button";
import Input from "@/components/UI/Input";
import Modal from "@/components/UI/Modal";
import Spinner from "@/components/UI/Spinner";
import { useCreateRecord, useRecordOptions, useUpdateRecord } from "@/logic/hooks/useRecords";
import {
  RecordOptions,
  Symptom,
  userRecord,
  VitalSign,
} from "@/logic/models/recordModel";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

interface RecordFormProps {
  mode?: "create" | "view" | "edit";
  recordData?: userRecord;
}

export default function RecordForm({
  mode = "create",
  recordData,
}: RecordFormProps) {
  const [isAddSymptomOpen, setIsAddSymptomOpen] = useState(false);
  const [symptomsRegistered, setSymptomsRegistered] = useState<Symptom[]>([]);
  const [signosRegistered, setSignosRegistered] = useState<VitalSign[]>([]);
  const [symptomOptions, setSymptomOptions] = useState<Symptom[]>([]); // Opciones de ejemplo
  const [signosOptions, setSignosOptions] = useState<VitalSign[]>([]); // Opciones de ejemplo
  const [searchSymptoms, setSearchSymptoms] = useState("");
  const { user } = useUser();
  const [editing, setEditing] = useState(mode === "view" ? false : true);

  const { data: recordOptions, isLoading: loadingOptions } =
    useRecordOptions() as { data: RecordOptions[]; isLoading: boolean };
  const { mutate: createRecord } = useCreateRecord();
  const { mutate: updateRecord } = useUpdateRecord();

  const [formData, setFormData] = useState({
    id: "",
    fechaRegistro: "",
    userId: "",
    parametrosControl: {
      signosVitales: [],
      sintomas: [],
      sintomasNoListados: [],
    },
  });

  const addSymptom = (symptom: Symptom) => {
    if (!symptomsRegistered.includes(symptom)) {
      setSymptomsRegistered([...symptomsRegistered, symptom]);
    }
  };

  const addSign = (sign: VitalSign) => {
    if (!signosRegistered.includes(sign)) {
      setSignosRegistered([...signosRegistered, sign]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
    fechaRegistro: formData.get("dateRecord") as string || "",
    userId: user?.id || "",
    parametrosControl: {
      signosVitales: signosRegistered.map((signo) => {
        return {
          nombre: signo.nombre,
          unidad: signo.unidad,
          valor: parseFloat(formData.get(signo.nombre) as string) || 0,
      }}),
      sintomas: symptomsRegistered.map((sintoma) => {
        return {
          nombre: sintoma.nombre,
          valor: parseFloat(formData.get(sintoma.nombre) as string) || 0,
        };
      }),
      sintomasNoListados: [
        {
          nombre: "Observaciones adicionales",
          descripcion: formData.get("observaciones") as string || "",
        },
      ],
    },
    };
    console.log(data);
    if (mode === "create") {
      console.log(data);
      createRecord(data);
      redirect("/usuario/registrosMedicos");
    } else if (mode === "view") {
      // data.id = "";
      updateRecord(data);
    }
  };

  useEffect(() => {
    if (recordOptions) {
      const parameterSet = recordOptions.find(
        (param: { id: string }) => param.id === "v1"
      );

      if (parameterSet) {
        setSymptomOptions(parameterSet.sintomas);
        setSignosOptions(parameterSet.signosVitales);
      }
      // console.log("Síntomas cargados:", parameterSet.sintomas);
    }
  }, [recordOptions]);

  const handleEdit = () => {
    setEditing(true);
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          label="Fecha y hora del registro*"
          name="dateRecord"
          id="dateRecord"
          type="datetime-local"
        />
        <div className="flex flex-row items-center gap-4">
          <h6>Sintomas</h6>
          {loadingOptions && <Spinner />}
          <FontAwesomeIcon
            icon={faPlus}
            className="py-1 px-2 rounded-full bg-primaryColor text-backgroundColor text-xl"
            onClick={() => {
              setIsAddSymptomOpen(true);
            }}
          />
        </div>
        {symptomsRegistered.map((symptom, index) => (
          <Input
            key={index}
            label={
            
              symptom.nombre +
              " (valor entre " +
              symptom.escala?.min +
              " y " +
              symptom.escala?.max +
              " )"
            }
            type={symptom.tieneEscala ? "number" : "text"}
            // max={symptom.escala.max}
            // min={symptom.escala.min}
            name={symptom.nombre}
            placeholder={`Ingrese valor para ${symptom.nombre}`}
          />
        ))}
        {signosRegistered.map((sign, index) => (
          <Input
            label={sign.nombre + " (" + sign.unidad + ")"}
            key={index}
            type={"number"}
            name={sign.nombre}
            placeholder={`Ingrese valor para ${sign.nombre}`}
          />
        ))}

        <Input
          label="Observaciones adicionales"
          type="text"
          name="observaciones"
        />

        <Button label="Registrar operación" fullWidth={true} type="submit" />
      </form>
      <Modal
        isOpen={isAddSymptomOpen}
        onClose={() => {
          setIsAddSymptomOpen(false);
        }}
        title="Agregar Sintoma"
        content={
          <>
            <p>Elige el sintoma que quieres agregar al registro:</p>
            <div className="relative my-4">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-primary"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm"
                placeholder="Ingrese el sintoma a buscar"
                onChange={(e) => setSearchSymptoms(e.target.value)}
                required
              />
            </div>
            <ul className="space-y-4 mb-4 overflow-y-auto">
              {symptomOptions
                .filter((options) => {
                  return options?.nombre
                    ?.toLowerCase()
                    .includes(searchSymptoms.toLowerCase());
                })
                .map((option, index) => (
                  <li
                    key={index}
                    className="flex justify-between py-2 px-4 w-full shadow-sm rounded-lg bg-secondary-50 items-center cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      addSymptom(option); // Agregar el síntoma al formulario
                      setIsAddSymptomOpen(false); // Cerrar el modal
                    }}
                  >
                    <span>{option.nombre}</span>
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="p-1 rounded-full bg-primary text-main text-l"
                    />
                  </li>
                ))}
              {signosOptions
                .filter((options) => {
                  return options?.nombre
                    ?.toLowerCase()
                    .includes(searchSymptoms.toLowerCase());
                })
                .map((option, index) => (
                  <li
                    key={index}
                    className="flex justify-between py-2 px-4 w-full shadow-sm rounded-lg bg-secondary-50 items-center cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      addSign(option); // Agregar el síntoma al formulario
                      setIsAddSymptomOpen(false); // Cerrar el modal
                    }}
                  >
                    <span>{option.nombre}</span>
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="p-1 rounded-full bg-primary text-main text-l"
                    />
                  </li>
                ))}
            </ul>
          </>
        }
      />
    </>
  );
}
