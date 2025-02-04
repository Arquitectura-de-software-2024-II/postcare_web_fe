"use client";

import { useUser } from "@/app/util/UserProvider";
import Button from "@/components/UI/button";
import ErrorMessage from "@/components/UI/ErrorMessage";
import InfoSkeleton from "@/components/UI/skeleton/InfoSkeleton";
import { useUserRecords } from "@/logic/hooks/useRecords";
import { userRecord } from "@/logic/models/recordModel";
import { faArrowRight, faCalendarDay, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserRecords() {
  const { user } = useUser();
  const {
    data: records,
    isLoading,
    error,
  } = useUserRecords({ userId: user?.id ?? "" }) as {
    data: userRecord[];
    isLoading: boolean;
    error: Error | null;
  };

  if (isLoading || !records) {
    return <InfoSkeleton />;
  }

  if (isLoading) {
    return <InfoSkeleton />;
  }

  if (error) {
    return (
      <p>Hubo un error cargando las operaciones, por favor intente más tarde</p>
    );
  }

  // Ordenar los registros del más actual al más antiguo
  const sortedRecords = records.sort((a, b) => {
    return new Date(b.fechaRegistro).getTime() - new Date(a.fechaRegistro).getTime();
  });

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
          {sortedRecords.length > 0 ? (
            sortedRecords.map((record, index) => (
              <li className="mb-6 ms-6" key={index}>
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
                        <p key={index}><b>{signo.nombre}:</b> {signo.valor} {signo.unidad}</p>
                      ))}
                      {record.parametrosControl.sintomas.map((sintoma, index) => (
                        <p key={index}><b>{sintoma.nombre}:</b> {sintoma.valor}</p>
                      ))}
                      {record.parametrosControl.sintomasNoListados.map((sintomaNoListado, index) => (
                        <p key={index}><b>{sintomaNoListado.nombre}:</b> {sintomaNoListado.descripcion} </p>
                      ))}
                    </>
                  )}
                </div> 
                <Button
                label="Ver detalles"
                rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                navigate={`/usuario/registrosMedicos/${record.id}`}
                additionalClasses="mt-4"
              />
              </li>
            ))
          ) : (
            <ErrorMessage type="info" message="Aún no hay registros creados" />
          )}
        </ol>
      </div>
    </>
  );
}
