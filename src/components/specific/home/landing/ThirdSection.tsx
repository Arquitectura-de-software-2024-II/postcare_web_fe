import Button from "@/components/UI/button";
import Card from "@/components/UI/card";
import { faArrowRight, faBook, faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ThirdSection() {
  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-8">
        {/* <div className="bg-backgroundColor-90 flex flex-row justify-center items-center border-gray-200 rounded-lg p-8 md:p-12 mb-8">
          
          <div className="flex flex-col max-w-lg">
            <h3 className="mb-2 text-primaryColor">
              Realiza seguimientos de tus sintomas
            </h3>
            <p className="text-lg font-normal text-gray-500 mb-6">
              
            </p>
            <Button
              label="Leer más"
              size="xl"
              navigate="/nosotros"
              rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
            />
          </div>
        </div> */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <div className="flex flex-row justify-center items-center ">
          <FontAwesomeIcon
            icon={faFileInvoice}
            className="w-16 h-16 mr-4 text-primaryColor"
          />
            <h3 className="mb-2 text-primaryColor leading-9">
            Realiza seguimientos de tus sintomas
            </h3>
            </div>
            <p className="text-lg font-normal text-gray-500 my-4">
            Con Postcare podrás llevar un control de los sintomas que
              presentas despues de tus cirugías, de este modo podemos podemos
              identificar emergencias en corto tiempo.
            </p>
            <Button
              label="Registrate aquí"
              navigate="/auth/registro"
              additionalClasses="inline-flex items-center justify-center"
              outlined={true}
              rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
            />
          </Card>
          <Card>
          <div className="flex flex-row justify-center items-center ">
          <FontAwesomeIcon
            icon={faBook}
            className="w-16 h-16 mr-4 text-primaryColor"
          />
            <h3 className="mb-2 text-primaryColor leading-9">
            Recursos educativos adicionales
            </h3>
            </div>
            <p className="text-lg font-normal text-gray-500 my-4">
              Además de acceder a un seguimiento postoperatorio, en Postcare tendras acceso a una amplia variedad de recursos educativos que te ayudarán a entender mejor tu proceso de recuperación.
            </p>
            <Button
              label="Registrate aquí"
              navigate="/auth/registro"
              additionalClasses="inline-flex items-center justify-center"
              outlined={true}
              rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
            />
          </Card>
        </div>
      </div>
    </section>
  );
}
