"use client";

import { useState } from "react";
import Button from "@/components/UI/button";
import ErrorMessage from "@/components/UI/ErrorMessage";
import InfoSkeleton from "@/components/UI/skeleton/InfoSkeleton";
import { useOperationsOptions } from "@/logic/hooks/useOperations";
import { OperationOption } from "@/logic/models/operationModel";
import { faChevronDown, faChevronUp, faCirclePlus, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function OperationsOptions() {
  const {
    data: operationsOptions,
    isLoading,
  } = useOperationsOptions() as {
    data: OperationOption[];
    isLoading: boolean;
    error: Error | null;
  };

  const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

  const toggleAccordion = (index: number) => {
    setExpandedIndices((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  if (isLoading || !operationsOptions) {
    return <InfoSkeleton />;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="text-primaryColor text-3xl">Operaciones disponibles:</h3>
        <Button
          label="Agregar operación"
          leftIcon={<FontAwesomeIcon icon={faCirclePlus} />}
          navigate="/usuario/admin/procedimientosMedicos/crearOperacion"
        />
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {operationsOptions.length > 0 ? (
          operationsOptions.map((operation, index) => (
            <div
              key={index}
              className="flex flex-col border border-gray-200 rounded-lg shadow"
            >
              <div
                className="flex flex-row items-center justify-between cursor-pointer px-5 py-2 bg-backgroundColor"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={expandedIndices.includes(index) ? faChevronUp : faChevronDown} className="mr-4" />
                <p className="font-semibold">{operation.nombre}</p>
                </div>
                <Button
                  label="Ver"
                  size="xs"
                  leftIcon={<FontAwesomeIcon icon={faEye} />}
                  navigate={`/usuario/admin/procedimientosMedicos/${operation.id}`}
                  outlined={true}
                  />
                  
              </div>
              {expandedIndices.includes(index) && (
                <div className="pr-4 pl-8 py-2">
                  {operation.tipo.map((type, typeIndex) => (
                    <div className="flex items-center gap-2" key={typeIndex}>
                    <div className="bg-primaryColor h-2 w-2 rounded-full"/>
                    <p key={typeIndex}>{type.nombre}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <ErrorMessage type="info" message="Aún no hay operaciones registradas" />
        )}
      </div>
    </>
  );
}