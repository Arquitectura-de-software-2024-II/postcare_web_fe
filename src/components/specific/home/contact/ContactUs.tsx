import Button from "@/components/UI/button";
import Card from "@/components/UI/card";
import Input from "@/components/UI/Input";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ContactUs() {
  return (
    <section className="grid max-w-screen-xl px-4 py-4 mx-auto lg:gap-8 lg:pt-4 lg:grid-cols-12 lg:pb-0 xl:gap-0">
      <div className="mr-auto place-self-center lg:col-span-7">
        <h1>Con Postcare tu salúd está en tus manos</h1>
        <p className="max-w-2xl mb-6 font-light text-textColor-500 lg:mb-8 md:text-lg lg:text-xl">
          Puedes realizar el seguimiento de tus sintomas postoperatorios y llevar un control de tu recuperación.
        </p>
        <Button
          label="Iniciar sesión"
          navigate="/auth/login"
          size="l"
          additionalClasses="inline-flex items-center justify-center"
        />
        <Button
          label="Registrate aquí"
          navigate="/auth/login"
          size="l"
          additionalClasses="inline-flex items-center justify-center"
          noBorder={true}
          rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
        />
      </div>
      <div className="hidden relative lg:mt-0 lg:col-span-5 lg:flex lg:w-[35vw] lg:h-[35vw] z-10">
        <Card>
        <form>
            <Input label="asunto"/>
        </form>
        </Card>
      </div>
    </section>
  );
}
