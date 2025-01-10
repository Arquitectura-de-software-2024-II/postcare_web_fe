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
              <h2 className="font-manrope font-bold text-4xl lg:text-5xl text-black mb-9 max-lg:text-center relative">
                Misión
              </h2>
              <p className="font-normal text-xl leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
                Driven by a passion for seamless user experiences, meticulously
                curated pagedone to empower creators, designers, and developers
                alike. Our mission is to provide a comprehensive toolkit,
                enabling you to build intuitive, beautiful interfaces that
                resonate with users on every interaction.
              </p>
            </div>
          </div>
      </div>
    </section>
  );
}
