import CreateOperationForm from "@/components/specific/forms/patient/createOperationForm";
import Card from "@/components/UI/card";

export default function RegistrarOperacion() {
  return (
    <Card aditionalClasses="max-w-3xl">
      <CreateOperationForm />
    </Card>
  );
}
