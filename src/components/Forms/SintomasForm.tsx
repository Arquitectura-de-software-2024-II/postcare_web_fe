"use client";

import Button from "@/components/Button/Button";
import TextField from "@/components/TextField/TextField";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "../Modal/Modal";
import { useEffect, useState } from "react";
import { useParameters } from "@/hooks/useParameters";
import Loader from "../Loader";
import { useRouter } from "next/navigation";
import { SignoVital, Sintoma } from "@/models/record";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/context/userContext";

export default function SintomasForm() {
  const [isAddSymptomOpen, setIsAddSymptomOpen] = useState(false);
  const [symptomsRegistered, setSymptomsRegistered] = useState<Sintoma[]>([]);
  const [signosRegistered, setSignosRegistered] = useState<SignoVital[]>([]);
  const [symptomOptions, setSymptomOptions] = useState<Sintoma[]>([]); // Opciones de ejemplo
  const [signosOptions, setSignosOptions] = useState<SignoVital[]>([]); // Opciones de ejemplo
  const [searchSymptoms, setSearchSymptoms] = useState("");
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { data: parameters, isLoading } = useParameters();

  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    

    const formData = new FormData(e.currentTarget);
    // const fechaCirugia = formData.get("fechaCirugia");
    // const date = fechaCirugia ? new Date(fechaCirugia.toString()) : new Date();
    const data = {
      fechaRegistro: "",
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
            descripcion: formData.get("observaciones") as string,
          },
        ],
      },
    };

    try {
      const response = await fetch(
        `http://localhost:8081/api/pacientes/${user?.id}/registros`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        toast.success("Registro guardado exitosamente");
        queryClient.invalidateQueries({ queryKey: ["userRecords"] });
        router.push(`/usuario/registros`);
      } else {
        toast.error("Error al guardar el registro");
      }
    } catch {
      toast.error("Error en la petición");    }
  };

  // Call setSymptoms to initialize symptom options
  useEffect(() => {
    if (parameters) {
      const parameterSet = parameters.find(
        (param: { id: string }) => param.id === "v1"
      );

      setSymptomOptions(parameterSet.sintomas);
      setSignosOptions(parameterSet.signosVitales);
      console.log("Síntomas cargados:", parameterSet.sintomas);
    }
  }, [parameters]);

  // Función para agregar un síntoma al form
  const addSymptom = (symptom: Sintoma) => {
    if (!symptomsRegistered.includes(symptom)) {
      setSymptomsRegistered([...symptomsRegistered, symptom]);
    }
  };

  const addSign = (sign: SignoVital) => {
    if (!signosRegistered.includes(sign)) {
      setSignosRegistered([...signosRegistered, sign]);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField label="Fecha y hora">
          <input type="datetime-local" name="fecha" />
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
          <TextField
            label={
              symptom.nombre +
              " (valor entre " +
              symptom.escala.min +
              " y " +
              symptom.escala.max +
              " )"
            }
            key={index}
          >
            <input
              type={symptom.tieneEscala ? "number" : "text"}
              max={symptom.escala.max}
              min={symptom.escala.min}
              name={symptom.nombre}
              placeholder={`Ingrese valor para ${symptom.nombre}`}
            />
          </TextField>
        ))}
        {signosRegistered.map((sign, index) => (
          
          <TextField label={sign.nombre+" ("+sign.unidad+")"} key={index}>
            
              <input
                type={"number"}
                name={sign.nombre}
                placeholder={`Ingrese valor para ${sign.nombre}`}
              />

          </TextField>
        ))}
        <TextField label="Observaciones adicionales">
          <input type="text" name="observaciones" />
        </TextField>
        <div className="h-5 w-2"></div>
        <Button type="submit">Registrar</Button>
      </form>

      <Modal
        isOpen={isAddSymptomOpen}
        onClose={() => {
          setIsAddSymptomOpen(false);
        }}
        title="Agregar Sintoma"
      >
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
      </Modal>
    </>
  );
}
