"use client";

import Button from "../UI/button";
import Link from "next/link";
import Logo from "../UI/Logo";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../UI/Avatar";
import { logout } from "@/logic/actions/logoutAction";
import { postLogout } from "@/logic/services/userManagementServices";

interface NavbarProps {
  role?: "notLoged" | "user" | "admin";
}

const navLinksNotRegistered = [
  { name: "Inicio", link: "/" },
  { name: "Nosotros", link: "/nosotros" },
  { name: "Contactenos", link: "/contactenos" },
];

const buttonLinksNotRegistered = [
  { name: "Registrarse", link: "/auth/registro" },
  { name: "Iniciar sesión", link: "/auth/login" },
];

const navLinksUser = [
  { name: "Perfil", link: "/usuario" },
  { name: "Procedimientos", link: "/usuario/procedimientosMedicos" },
  { name: "Registros", link: "/usuario/registrosMedicos" },
];

const navLinksProfile = [
  { name: "Perfil", link: "/usuario/perfil"},
  { name: "Configuración", link: "/usuario/configuracion"},
];

const navLinksAdmin = [
  { name: "Admin", link: "/" },
  { name: "Configuraciones", link: "#" },
];

const Navbar: React.FC<NavbarProps> = ({ role = "notLoged" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    postLogout();
    logout();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  let links;

  if (role === "user") {
    links = navLinksUser;
  } else if (role === "admin") {
    links = navLinksAdmin;
  } else {
    links = navLinksNotRegistered;
  }

  const linksClasses =
    "block border-0 ease-in-out duration-200 md:hover:border-b-4 py-2 px-3 rounded md:hover:bg-transparent md:p-0 md:hover:text-backgroundColor hover:bg-backgroundColor hover:text-primaryColor";

  return (
    <nav className="fixed w-full z-50 top-0 start-0 text-backgroundColor bg-primaryColor shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Logo color="background" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Postcare
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 relative">
          {role === "user" ? (
            <>
              <div onClick={toggleProfileMenu} className="cursor-pointer">
                <Avatar />
              </div>
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-12 w-48 bg-white text-primaryColor shadow-lg rounded-lg text-base z-50">
                  <ul className="py-2" aria-labelledby="user-menu-button ">
                    {navLinksProfile.map((navItem, index) => (
                      <li key={index}>
                        <Link
                          href={navItem.link}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center border-b-2"
                        >
                          {navItem.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                      >
                        Cerrar sesión
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <>
              <Button
                label="Registrarse"
                color="background"
                navigate="/auth/registro"
                outlined={true}
                additionalClasses="hidden md:block"
              />
              <Button
                label="Iniciar sesión"
                color="background"
                navigate="/auth/login"
                additionalClasses="hidden md:block"
              />
            </>
          )}
          <button
            onClick={toggleMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden hover:bg-grayColor-20 hover:text-primaryColor focus:outline-none"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <FontAwesomeIcon
              icon={isMenuOpen ? faTimes : faBars}
              className="w-5 h-5"
            />
          </button>
        </div>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-backgroundColor rounded-lg md:space-x-8 md:flex-row md:mt-0 md:border-0">
            {links.map((navItem, index) => (
              <li key={index}>
                <Link href={navItem.link} className={linksClasses}>
                  {navItem.name}
                </Link>
              </li>
            ))}
            {role === "notLoged" &&
              buttonLinksNotRegistered.map((navItem, index) => (
                <li key={index} className="block md:hidden">
                  <Link href={navItem.link} className={linksClasses}>
                    {navItem.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
