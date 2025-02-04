"use client";

import { useState } from "react";
import Button from "@/components/UI/button";
import ErrorMessage from "@/components/UI/ErrorMessage";
import InfoSkeleton from "@/components/UI/skeleton/InfoSkeleton";
import {
  faChevronDown,
  faChevronUp,
  faCirclePlus,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecordOptions } from "@/logic/hooks/useRecords";
import { RecordOptions } from "@/logic/models/recordModel";

export default function ParamsOptions() {
  const { data: recordOptions, isLoading } = useRecordOptions() as {
    data: RecordOptions[];
    isLoading: boolean;
    error: Error | null;
  };

  const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

  const toggleAccordion = (index: number) => {
    setExpandedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (isLoading || !recordOptions) {
    return <InfoSkeleton />;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="text-primaryColor text-3xl">Versiones:</h3>
        <Button
          label="Crear versión"
          leftIcon={<FontAwesomeIcon icon={faCirclePlus} />}
          navigate="/usuario/admin/parametros/crearVersion"
        />
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {recordOptions.length > 0 ? (
          recordOptions.map((param, index) => (
            <div
              key={index}
              className="flex flex-col border border-gray-200 rounded-lg shadow"
            >
              <div
                className="flex flex-row items-center justify-between cursor-pointer px-5 py-2 bg-backgroundColor"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex items-center gap-4">
                  <FontAwesomeIcon
                    icon={
                      expandedIndices.includes(index)
                        ? faChevronUp
                        : faChevronDown
                    }
                    className="mr-4"
                  />
                  <p>{param.id}</p>
                </div>
                <Button
                  label="Ver"
                  size="xs"
                  leftIcon={<FontAwesomeIcon icon={faEye} />}
                  navigate={`/usuario/admin/parametros/${param.id}`}
                  outlined={true}
                />
              </div>
              {expandedIndices.includes(index) && (
                <div className="pr-4 pl-8 py-2">
                  <p className="font-semibold text-primaryColor">
                    Signos vitales
                  </p>
                  {param.signosVitales?.map((type, typeIndex) => (
                    <div className="flex items-center gap-2 pl-4" key={typeIndex}>
                      <div className="bg-primaryColor h-2 w-2 rounded-full" />
                      <p key={typeIndex}>
                        {type.nombre} ({type.unidad})
                      </p>
                    </div>
                  ))}
                  <p className="font-semibold text-primaryColor">Sintomas</p>
                  {param.sintomas?.map((type, typeIndex) => (
                    <div className="flex items-center gap-2 pl-4" key={typeIndex}>
                      <div className="bg-primaryColor h-2 w-2 rounded-full" />
                      <p key={typeIndex}>{type.nombre}{type.escala && ` (${type.escala.min} - ${type.escala.max})`}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <ErrorMessage
            type="info"
            message="Aún no hay operaciones registradas"
          />
        )}
      </div>
    </>
  );
}
