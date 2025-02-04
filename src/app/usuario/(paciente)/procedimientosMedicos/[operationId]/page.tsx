import EditOperationForm from "@/components/specific/forms/patient/editOperationForm";
import Card from "@/components/UI/card";

export default async function EditarOperacion({
  params,
}: {
  params: Promise<{ operationId: string }>;
}) {
  const { operationId } = await params;
  return (
    <Card aditionalClasses="max-w-3xl">
      <EditOperationForm operationId={operationId} />
    </Card>
  );
}
