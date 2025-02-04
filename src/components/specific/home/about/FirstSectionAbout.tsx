import Image from "next/image";

export default function FirstSectionAbout() {
  return (
    <section className="grid max-w-screen-xl mx-auto lg:gap-8 lg:grid-cols-2 lg:pb-0 xl:gap-8 h-full">
      <div className="hidden relative lg:mt-0 lg:col-span-1 lg:flex lg:w-[35vw] lg:h-[35vw] z-10">
        <Image
          fill
          src="/misionImage.png"
          alt="imagen mision"
          className="z-10"
        />
      </div>
      <div className="flex justify-center items-center w-full relative lg:mt-0 lg:col-span-1 lg:w-[35vw] lg:h-[35vw] z-10 ">
      <div className="lg:pl-[100px] flex items-center">
            <div className="data w-full">
              <h2 className="text-primaryColor">
                Nuestra misión
              </h2>
              <p className="font-normal text-xl leading-8 max-lg:text-center max-w-2xl mx-auto">
                Brindar a nuestros pacientes una herramienta que les permita llevar un control de los sintomas que presentan despues de sus cirugías, de este modo podemos identificar emergencias en corto tiempo, velando por su salúd aún despues de salir del hospital.
              </p>
            </div>
          </div>
      </div>
    </section>
  );
}
