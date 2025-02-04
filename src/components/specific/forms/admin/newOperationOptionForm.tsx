import NavForm from "@/components/UI/NavForm";
import AdminOperationForm from "./adminOperationOptionForm";

export default function NewOperationOptionForm() {
  return (
    <>
      <NavForm
        backLink="/usuario/admin/procedimientosMedicos"
        title="Agregar operación"
      />
      <AdminOperationForm mode="create" />
    </>
  );
}
