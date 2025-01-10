"use client";

import { useUser } from "@/app/util/UserProvider";
import Button from "@/components/UI/button";
import ErrorMessage from "@/components/UI/ErrorMessage";
import InfoSkeleton from "@/components/UI/skeleton/InfoSkeleton";
import { useUserOperations } from "@/logic/hooks/useOperations";
import { UserOperation } from "@/logic/models/operationModel";
import {
  faArrowRight,
  faBone,
  faCirclePlus,
  faHeartPulse,
  faStaffSnake,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserOperations() {
  const { user } = useUser();
  const {
    data: operations,
    isLoading,
  } = useUserOperations({ userId: user?.id ?? "" }) as {
    data: UserOperation[];
    isLoading: boolean;
    error: Error | null;
  };

  if (isLoading || !operations) {
    return <InfoSkeleton />;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="text-primaryColor text-3xl">Operaciones registradas:</h3>
        <Button
          label="Agregar operación"
          leftIcon={<FontAwesomeIcon icon={faCirclePlus} />}
          navigate="/usuario/procedimientosMedicos/registrarOperacion"
        />
      </div>
      <div className="flex mx-auto justify-center items-center mt-6">
      {operations.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {operations.map((operation, index) => (
            <div
              key={index}
              className="max-w-sm px-6 py-5 bg-backgroundColor border border-gray-200 rounded-lg shadow"
            >
              <div className="flex flex-row justify-start items-center w-full ">
                <FontAwesomeIcon
                  icon={
                    operation.nombreCirugia?.toLowerCase().includes("cardio")
                      ? faHeartPulse
                      : operation.nombreCirugia?.toLowerCase().includes("orto")
                      ? faBone
                      : operation.nombreCirugia?.toLowerCase().includes("onco")
                      ? faStaffSnake
                      : faUserDoctor
                  }
                  className="w-10 h-10 text-primaryColor mb-2 mr-4"
                />
                <h5 className="mb-2 text-xl font-semibold tracking-tight text-primaryColor">
                  {`Operación ${operation.nombreCirugia} (${operation.tipoCirugia})`}
                </h5>
              </div>
              <div className="mb-4">
                <p className="font-normal">
                  <b>Fecha:</b>{" "}
                  {operation.fechaCirugia?.toString().split("T")[0]}
                </p>
                <p className="font-normal">
                  <b>Médico:</b> {operation.nombreMedico}
                </p>
                <p className="font-normal ">
                  <b>Observaciones:</b> {operation.descripcion}
                </p>
              </div>
              <Button
                label="Ver detalles"
                rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                navigate={`/usuario/procedimientosMedicos/${operation.id}`}
              />
            </div>
          ))}
        </div>
      ) : (
        <ErrorMessage type="info" message="Aún no hay operaciones registradas" />
      )}
      </div>
    </>
  );
}
