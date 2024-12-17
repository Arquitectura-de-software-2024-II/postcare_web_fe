import SurgeryForm from "@/components/Forms/SurgeryForm";

export default function FormOperaciones() {
  return (
    <section className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 mb-8">
      <h4 className="text-primary text-center">Agregar operación</h4>
      <SurgeryForm />
    </section>
  );
}
