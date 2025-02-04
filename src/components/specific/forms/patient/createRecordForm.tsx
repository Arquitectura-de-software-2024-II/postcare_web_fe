import NavForm from "@/components/UI/NavForm";
import RecordForm from "./recordForm";

export default function CreateRecordForm() {
  return (
    <>
      <NavForm
        backLink="/usuario/registrosMedicos"
        title="Agregar operación"
      />
      <RecordForm mode="create" />
    </>
  );
}
