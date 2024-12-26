// import Button from "@/components/Button/Button";

import ListOperations from "@/components/Lists/ListOperations";
import Link from "next/link";

export default function Usuario() {
  return (
    <>
      {/* Header */}
      <header className="text-center mb-10 ">
        <h4 className="text-primary">Operaciones</h4>
        <h6 className="text-gray-600 mt-2">
          Bienvenid@ de nuevo,{" "}
          <span className="font-medium text-gray-800">Usuario</span>
        </h6>
      </header>

      {/* Operaciones recientes */}
      <section className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Operaciones recientes
        </h2>
        <ListOperations />
        <Link href="/usuario/formulario" className="block">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
            Registra una operación
          </button>
        </Link>
      </section>
    </>
  );
}
