import Button from "@/components/UI/button";
import Card from "@/components/UI/card";
import FormTitle from "@/components/UI/FormTitle";
import Input from "@/components/UI/Input";
import Image from "next/image";

export default function ContactUs() {
  return (
    <section className="grid max-w-screen-xl justify-center items-center mx-auto lg:gap-8 lg:grid-cols-2 lg:pb-0 xl:gap-8">
      <div className="hidden relative lg:mt-0 lg:col-span-1 lg:flex lg:w-[35vw] lg:h-[35vw] z-10">
        <Image
          fill
          src="/contactImage.png"
          alt="Postcare logo"
          className="z-10"
        />
      </div>
        <Card aditionalClasses="max-w-sm">
          <FormTitle title="Contáctenos" />
          <form className="flex flex-col gap-4">
            <Input label="Asunto*" />
            <Input label="Correo*" />
            <Input label="Descripción*" />
            <Button label="Enviar" fullWidth={true} additionalClasses="mt-2"/>
          </form>
        </Card>
      
    </section>
  );
}
