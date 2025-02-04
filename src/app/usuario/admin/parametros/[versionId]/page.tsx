import EditRecordOptionForm from "@/components/specific/forms/admin/editRecordOptionForm";
import Card from "@/components/UI/card";

export default async function EditarOpcionOperacion({
  params,
}: {
  params: Promise<{ versionId: string }>;
}) {
  const { versionId } = await params;
  return (
    <Card aditionalClasses="max-w-3xl">
      <EditRecordOptionForm recordOptionId={versionId} />
    </Card>
  );
}
