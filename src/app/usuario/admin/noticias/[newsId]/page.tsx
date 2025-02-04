import EditNewsForm from "@/components/specific/forms/admin/editNewsForm";
import Card from "@/components/UI/card";

export default async function EditarNoticia({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) {
  const { newsId } = await params;
  return (
    <Card aditionalClasses="max-w-3xl">
      <EditNewsForm newsId={newsId} />
    </Card>
  );
}
