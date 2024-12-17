"use client";

import Button from "@/components/Button/Button";
import TextField from "@/components/TextField/TextField";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "../Modal/Modal";
import { useEffect, useState } from "react";
import { Symptom } from "@/models/symptom";
import { useParameters } from "@/hooks/useParameters";
import Loader from "../Loader";

export default function SintomasForm() {
  const [isAddSymptomOpen, setIsAddSymptomOpen] = useState(false);
  const [symptomsRegistered, setSymptomsRegistered] = useState<Symptom[]>([]);
  const [symptomOptions, setSymptomOptions] = useState<Symptom[]>([]); // Opciones de ejemplo
  const [searchSymptoms, setSearchSymptoms] = useState("");	

  const { data: parameters, isLoading } = useParameters();

  // Call setSymptoms to initialize symptom options
  useEffect(() => {
    if (parameters) {
      const parameterSet = parameters.find(
        (param: { id: string }) => param.id === "v1"
      );

      // Mapear signos vitales (si es necesario) a opciones de síntomas
      const signs = parameterSet.signosVitales.map(
        (signo: { nombre: string; id: string }) => ({
          name: signo.nombre,
          type: "signoVital", // Puedes usar un tipo específico para diferenciar los signos vitales
          hasScale: 
          id: signo.id,
        })
      );

      // Mapear síntomas (con su escala)
      const symptoms = parameterSet.sintomas.map(
        (sintoma: { nombre: string; id: string }) => ({
          name: sintoma.nombre,
          type: "sintoma", // Puedes usar un tipo específico para diferenciar los síntomas
          id: sintoma.id,
        })
      );

      // Concatenar signos vitales y síntomas a las opciones de síntomas
      setSymptomOptions([...signs, ...symptoms]);
    }
  }, [parameters]);

  // Función para agregar un síntoma al form
  const addSymptom = (symptom: Symptom) => {
    if (!symptomsRegistered.includes(symptom)) {
      setSymptomsRegistered([...symptomsRegistered, symptom]);
    }
  };

  return (
    <>
      <form>
        <TextField label="Fecha">
          <input type="date" name="fecha" />
        </TextField>
        <div className="flex flex-row items-center gap-4">
          <h6>Sintomas</h6>
          {isLoading && <Loader />}
          <FontAwesomeIcon
            icon={faPlus}
            className="p-1 rounded-full bg-primary text-main text-xl"
            onClick={() => {
              setIsAddSymptomOpen(true);
            }}
          />
        </div>

        {/* Renderizar los campos de entrada para los síntomas registrados */}
        {symptomsRegistered.map((symptom, index) => (
          <TextField label={symptom.name} key={index}>
            <input
              type={symptom.name === "Fiebre" ? "number" : "text"}
              name={`symptom-${index}`}
              placeholder={`Ingrese valor para ${symptom}`}
            />
          </TextField>
        ))}

        <Button>Registrar</Button>
      </form>

      <Modal
        isOpen={isAddSymptomOpen}
        onClose={() => {
          setIsAddSymptomOpen(false);
        }}
        title="Agregar Sintoma"
      >
        <p>
        Elige el sintoma que quieres agregar al registro:
        </p>
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
          {symptomOptions.filter((options) => {
    return options.name.toLowerCase().includes(searchSymptoms.toLowerCase());
  }).map((option, index) => (
            <li
              key={index}
              className="flex justify-between py-2 px-4 w-full shadow-sm rounded-lg bg-secondary-50 items-center cursor-pointer hover:bg-gray-100"
              onClick={() => {
                addSymptom(option); // Agregar el síntoma al formulario
                setIsAddSymptomOpen(false); // Cerrar el modal
              }}
            >
              <span>{option.name}</span>
              <FontAwesomeIcon
                icon={faPlus}
                className="p-1 rounded-full bg-primary text-main text-l"
              />
            </li>
          ))}
        </ul>
      </Modal>
    </>
  );
}
