import Button from "@/components/Button/Button";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faBell, faFileContract, faSquarePollVertical } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

// import Carrusel from "@/components/Carrusel/Carrusel";

export default function Home() {
  return (
    <div className="landing-page">
      {/* Sección Principal */}
      <div className="flex flex-row justify-between items-center">
        {/* Texto principal */}
        <div className="flex flex-col w-1/2 justify-center items-start space-y-6">
          <h4 className="text-4xl font-bold text-primary">
            Tu salud, siempre en tus manos.
          </h4>
          <p className="text-lg text-black">
            Bienvenid@ a <strong>Postcare</strong>, el servicio que permite
            realizar seguimiento de pacientes después de sus operaciones,
            garantizando una recuperación más segura y controlada.
          </p>
          <div className="flex flex-row gap-6">
          <Link href="/registro" className="noStyle"><Button>Conoce más</Button></Link>
            
            {/* <button className="bg-primary text-white px-6 py-2 rounded-md shadow-md hover:bg-primary-dark">
            Regístrate
          </button>
          <button className="bg-secondary text-white px-6 py-2 rounded-md shadow-md hover:bg-secondary-dark">
            Conoce más
          </button> */}
          </div>
        </div>

        {/* Imagen principal */}
        <div className="h-full flex flex-col justify-center w-[35vw]">
          <div className="relative w-[35vw] h-[35vw]">
            <Image fill src="/landing.png" alt="Postcare logo" />
          </div>
        </div>
      </div>

      {/* Sección: ¿Cómo funciona? */}
      <div className="flex separador_landing bg-primary py-8 px-8">
        <div className="w-full flex justify-center mb-8 h-fit">

            <FontAwesomeIcon
              icon={faAngleDown}
              className="text-main text-3xl animate-bounce"
            />
    
        </div>

        <h4 className="text-3xl font-semibold text-main mb-4">
          ¿Cómo funciona?
        </h4>
        <p className="text-lg text-main text-center mx-10">
          <strong>Postcare</strong> es una aplicación que permite a los
          pacientes y a los profesionales de la salud realizar un seguimiento de
          la evolución de los pacientes después de una operación. Además, ofrece
          herramientas interactivas para monitorear el progreso en tiempo real.
        </p>
      </div>

      {/* Sección Características */}
      <div className="features-section bg-gray-50 py-10 px-8 ">
        <h4 className="text-3xl font-semibold text-primary mb-8">
          Características Clave
        </h4>
        <div className="grid grid-cols-3 gap-6 py-10">
          <div className="flex flex-col items-center text-center space-y-4">
            <FontAwesomeIcon
              icon={faBell}
              className="text-primary text-8xl animate-bounce"
            />
            <h5 className="text-primary text-xl font-semibold">Recordatorios Personalizado</h5>
            <p className="text-gray-600">
              Recordatorios para tus citas de seguimiento y medicamentos.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <FontAwesomeIcon
              icon={faFileContract}
              className="text-primary text-8xl animate-bounce"
            />
            <h5 className="text-primary text-xl font-semibold">
              Control en Tiempo Real
            </h5>
            <p className="text-gray-600">
            Los pacientes pueden registrar síntomas y recibir alertas
            personalizadas.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <FontAwesomeIcon
              icon={faSquarePollVertical}
              className="text-primary text-8xl animate-bounce"
            />
            <h5 className="text-primary text-xl font-semibold">Estadísticas Detalladas</h5>
            <p className="text-gray-600">
              Informes detallados del progreso para mejorar el tratamiento.
            </p>
          </div>
        </div>
      </div>

      {/* Sección Carrusel */}
      {/* <Carrusel /> */}
    </div>
  );
}
