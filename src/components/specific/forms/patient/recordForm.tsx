"use client";

import { useUser } from "@/app/util/UserProvider";
import Button from "@/components/UI/button";
import Input from "@/components/UI/Input";
import Modal from "@/components/UI/Modal";
import Spinner from "@/components/UI/Spinner";
import {
  useCreateRecord,
  useRecordOptions,
  useUpdateRecord,
} from "@/logic/hooks/useRecords";
import {
  RecordOptions,
  Symptom,
  userRecord,
  VitalSign,
} from "@/logic/models/recordModel";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
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
  const [symptomOptions, setSymptomOptions] = useState<Symptom[]>([]);
  const [signosOptions, setSignosOptions] = useState<VitalSign[]>([]);
  const [searchSymptoms, setSearchSymptoms] = useState("");
  const { user } = useUser();

  const { data: recordOptions, isLoading: loadingOptions } =
    useRecordOptions() as { data: RecordOptions[]; isLoading: boolean };
  const { mutate: createRecord } = useCreateRecord();
  const { mutate: updateRecord } = useUpdateRecord();

  const [formData, setFormData] = useState({
    id: "",
    dateRecord: "",
    userId: "",
    sintomas: {} as { [key: string]: string },
    signos: {} as { [key: string]: string },
    observaciones: "",
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
    const data: userRecord = {
      fechaRegistro: formData.dateRecord,
      userId: user?.id || "",
      parametrosControl: {
        signosVitales: signosRegistered.map((signo) => ({
          nombre: signo.nombre,
          unidad: signo.unidad,
          valor: parseFloat(formData.signos[signo.nombre]) || 0,
        })),
        sintomas: symptomsRegistered.map((sintoma) => ({
          nombre: sintoma.nombre,
          valor: parseFloat(formData.sintomas[sintoma.nombre]) || 0,
        })),
        sintomasNoListados: [
          {
            nombre: "Observaciones adicionales",
            descripcion: formData.observaciones,
          },
        ],
      },
    };
    console.log(data);
    if (mode === "create") {
      createRecord(data);
      redirect("/usuario/registrosMedicos");
    } else if (mode === "edit") {
      data.id = recordData?.id || "";
      updateRecord(data);
      redirect("/usuario/registrosMedicos");
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
    }
  }, [recordOptions]);

  useEffect(() => {
    if (mode === "view" && recordData) {
      setFormData({
        id: recordData.id ? recordData.id : "",
        dateRecord: recordData.fechaRegistro ? recordData.fechaRegistro : "",
        userId: user?.id ?? "",
        sintomas: recordData.parametrosControl.sintomas.reduce(
          (acc, sintoma) => ({ ...acc, [sintoma.nombre]: (sintoma.valor ?? "").toString() }),
          {}
        ),
        signos: recordData.parametrosControl.signosVitales.reduce(
          (acc, signo) => ({ ...acc, [signo.nombre]: (signo.valor ?? "").toString() }),
          {}
        ),
        observaciones: recordData.parametrosControl.sintomasNoListados[0]?.descripcion || "",
      });
      setSymptomsRegistered(recordData.parametrosControl.sintomas);
      setSignosRegistered(recordData.parametrosControl.signosVitales);
    }
  }, [mode, recordData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSymptomChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      sintomas: {
        ...prev.sintomas,
        [name]: value,
      },
    }));
  };

  const handleSignChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      signos: {
        ...prev.signos,
        [name]: value,
      },
    }));
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          label="Fecha y hora del registro*"
          name="dateRecord"
          id="dateRecord"
          type="datetime-local"
          value={formData.dateRecord}
          onChange={handleChange}
          disabled={mode == "view"}
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
            label={`${symptom.nombre} ${symptom.escala ? `(valor entre ${symptom.escala?.min} y ${symptom.escala?.max})` : ''}`}
            type={symptom.tieneEscala ? "number" : "text"}
            name={symptom.nombre}
            value={formData.sintomas[symptom.nombre] || ""}
            placeholder={`Ingrese valor para ${symptom.nombre}`}
            onChange={handleSymptomChange}
            disabled={mode == "view"}
          />
        ))}
        {signosRegistered.map((sign, index) => (
          <Input
            key={index}
            label={`${sign.nombre} (${sign.unidad})`}
            type="number"
            name={sign.nombre}
            value={formData.signos[sign.nombre] || ""}
            placeholder={`Ingrese valor para ${sign.nombre}`}
            onChange={handleSignChange}
            disabled={mode == "view"}
          />
        ))}
        <Input
          label="Observaciones adicionales"
          type="text"
          name="observaciones"
          value={formData.observaciones}
          onChange={handleChange}
          disabled={mode == "view"}
        />
        {mode !== "view"  && (
          <Button
            label={
              mode === "create" ? "Crear registro" : "Guardar registro"
            }
            fullWidth={true}
            type="submit"
          />
        )}
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
                <FontAwesomeIcon
                  icon={faSearch}
                  className="w-4 h-4 text-primary"
                />
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