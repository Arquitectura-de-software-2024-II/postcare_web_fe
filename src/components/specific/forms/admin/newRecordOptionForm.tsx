import NavForm from "@/components/UI/NavForm";
import AdminRecordForm from "./adminRecordOptionsForm";

export default function NewRecordOptionForm() {
  return (
    <>
      <NavForm
        backLink="/usuario/admin/parametros"
        title="Agregar versión de parametros"
      />
      <AdminRecordForm mode="create" />
    </>
  );
}
