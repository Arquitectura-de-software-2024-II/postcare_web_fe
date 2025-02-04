
import EditRecordForm from "@/components/specific/forms/patient/editRecordForm";
import Card from "@/components/UI/card";

export default async function EditarRegistro({
  params,
}: {
  params: Promise<{ registroId: string }>;
}) {
  const { registroId } = await params;
  return (
    <Card aditionalClasses="max-w-3xl">
      <EditRecordForm recordId={registroId} />
    </Card>
  );
}
