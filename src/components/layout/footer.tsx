import Logo from "../UI/logo";

const Footer = () => {
  return (
    <div className="bg-primaryColor shadow w-full text-backgroundColor">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
           <Logo color="background" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Postcare
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-main sm:mb-0  mr-8">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Sobre nosotros
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Politica de privacidad
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licencias
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contacto
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 sm:mx-auto  lg:my-8" />
        <span className="block text-sm sm:text-center ">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Postcare™
          </a>
          . Todos los derechos reservados.
        </span>
      </div>
    </div>
  );
};

export default Footer;
