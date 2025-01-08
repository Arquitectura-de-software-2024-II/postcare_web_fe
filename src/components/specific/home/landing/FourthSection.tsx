import Accordion from "@/components/UI/accordion";

const accordionData = [
  {
    question: "¿Qué es Postcare?",
    answer: "Postcare es una aplicación diseñada para el seguimiento de nuestros pacientes postoperatorios y de este modo brindarles una atención más personalizada.",
  },
  {
    question: "¿Está disponible para cualquier persona?",
    answer: "En este momento postcar está limitada a los pacientes de la clínica X, pero estamos trabajando para que esté disponible para cualquier persona.",
  },
  {
    question: "¿Tiene algún costo?",
    answer: "Es completamente gratis para los pacientes de la clínica X.",
  },
];

export default function FourthSection() {
  return (
    <section className="w-full grid max-w-screen-xl px-4 pt-0 pb-10 mx-auto">
      <h2 className="pb-8 text-primaryColor">Preguntas frecuentes</h2>
      <Accordion items={accordionData} />
    </section>
  );
}
