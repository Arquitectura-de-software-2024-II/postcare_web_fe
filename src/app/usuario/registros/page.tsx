// import Button from "@/components/Button/Button";
import Link from "next/link";


export default function Registros() {
    return (

                <>
                    {/* Header */}
                    <header className="text-center mb-10">
                        <h4 className="text-primary">Seguimiento de Síntomas</h4>
                        <p className="text-gray-600 mt-2">Mantén un registro detallado de tus síntomas para mejorar tu salud.</p>
                    </header>
        
                    {/* Registro de Síntomas */}
                    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 mb-8">
                        <Link href="/usuario/registros/formulario" className="block">
                            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
                                Registra tus síntomas
                            </button>
                        </Link>
                    </div>
        
                    {/* Últimos Registros */}
                    <section className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Últimos registros realizados</h2>
                        <p className="text-gray-500">No tienes registros recientes. ¡Comienza registrando tus síntomas!</p>
                    </section>
                </>
    );
}