import EditOperationOptionForm from "@/components/specific/forms/admin/editOperationOptionForm";
import Card from "@/components/UI/card";

export default async function EditarOpcionOperacion({
  params,
}: {
  params: Promise<{ operationOptionId: string }>;
}) {
  const { operationOptionId } = await params;
  return (
    <Card aditionalClasses="max-w-3xl">
      <EditOperationOptionForm operationOptionId={operationOptionId} />
    </Card>
  );
}
