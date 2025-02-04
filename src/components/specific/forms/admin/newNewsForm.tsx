import NavForm from "@/components/UI/NavForm";
import AdminNewsForm from "./adminNewsForm";

export default function NewNewsForm() {
  return (
    <>
      <NavForm
        backLink="/usuario/admin/noticias"
        title="Agregar Noticia"
      />
      <AdminNewsForm mode="create" />
    </>
  );
}
