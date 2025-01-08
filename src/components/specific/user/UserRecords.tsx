"use client";

import Button from "@/components/UI/button";
import InfoSkeleton from "@/components/UI/skeleton/InfoSkeleton";
import { useRecords } from "@/logic/hooks/useRecords";
import { userRecord } from "@/logic/models/recordModel";
import { faCalendarDay, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserRecords() {
  const { data, isLoading, error } = useRecords();
  const records = data as userRecord[] | undefined;

  if (isLoading) {
    return <InfoSkeleton />;
  }

  if (error) {
    return (
      <p>Hubo un error cargando las operaciones, por favor intente más tarde</p>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="text-primaryColor">
          Ultimos registros médicos creados:
        </h3>
        <Button
          label="Agregar registro"
          leftIcon={<FontAwesomeIcon icon={faCirclePlus} />}
          navigate="/usuario/registrosMedicos/crearRegistro"
        />
      </div>
      <div className="mx-auto p-4">
        <ol className="relative border-s border-grayColor-20">
          {records? (
            records.map((record, index) => (
              <li className="mb-10 ms-6" key={index}>
                <span className="absolute flex items-center justify-center w-6 h-6 bg-primaryColor-10 rounded-full -start-3 ring-8 ring-backgroundColor-90">
                  <FontAwesomeIcon
                    icon={faCalendarDay}
                    className="w-2.5 h-2.5 text-primaryColor"
                  />
                </span>
                <h3 className="mb-1 text-lg font-semibold text-primaryColor">
                  {record.fechaRegistro?.toString().split("T")[0]} {"   "}
                  {record.fechaRegistro?.toString().split("T")[1].replace("Z", "")}
                </h3>
                {/* <time className="block mb-2 text-sm font-normal leading-none text-textColor-40 ">
                  {record.fechaRegistro}
                </time> */}
                <div className="text-base font-normal text-textColor-50">
                {record.parametrosControl && (
                    <>
                      {record.parametrosControl.signosVitales.map((signo, index) => (
                        <p key={index}>{signo.nombre}: {signo.valor} </p>
                      ))}
                      {record.parametrosControl.sintomas.map((sintoma, index) => (
                        <p key={index}>{sintoma.nombre}: {sintoma.valor} </p>
                      ))}
                      {record.parametrosControl.sintomasNoListados.map((sintomaNoListado, index) => (
                        <p key={index}>{sintomaNoListado.nombre}: {sintomaNoListado.descripcion} </p>
                      ))}
                    </>
                  )}
                </div> 
              </li>
            ))
          ) : (
            <p>Aún no hay operaciones registradas</p>
          )}
        </ol>
      </div>
    </>
  );
}
