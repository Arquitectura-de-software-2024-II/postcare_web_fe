export default function FirstSectionAbout() {
  return (
    <section className="py-14 lg:py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
          <div className="img-box">
            <img
              src="https://pagedone.io/asset/uploads/1702034769.png"
              alt="About Us tailwind page"
              className="max-lg:mx-auto object-cover"
            />
          </div>
          <div className="lg:pl-[100px] flex items-center">
            <div className="data w-full">
              <h2 className="font-manrope font-bold text-4xl lg:text-5xl text-black mb-9 max-lg:text-center relative">
                About Us{" "}
              </h2>
              <p className="font-normal text-xl leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
                Driven by a passion for seamless user experiences,
                meticulously curated pagedone to empower creators, designers,
                and developers alike. Our mission is to provide a comprehensive
                toolkit, enabling you to build intuitive, beautiful interfaces
                that resonate with users on every interaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
