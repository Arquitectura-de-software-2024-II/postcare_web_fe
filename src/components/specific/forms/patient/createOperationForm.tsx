import OperationForm from "./operationForm";
import NavForm from "@/components/UI/NavForm";

export default function CreateOperationForm() {
  return (
    <>
      <NavForm
        backLink="/usuario/procedimientosMedicos"
        title="Agregar operación"
      />
      <OperationForm mode="create" />
    </>
  );
}
