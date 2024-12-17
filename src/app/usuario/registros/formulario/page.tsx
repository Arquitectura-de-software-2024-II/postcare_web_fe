import SintomasForm from "@/components/Forms/SintomasForm";


export default function FormRegistros() {
    return (
        <section className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 mb-8">
            <h4 className="text-primary text-center">Agregar registro</h4>
            <SintomasForm />
        </section>
    );
}