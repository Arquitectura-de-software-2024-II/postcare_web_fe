"use client";

import styles from "./Navbar.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { useState } from "react";

interface AppBarProps {
  auth: boolean,
}


export default function Navbar ({auth}: AppBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // const handleLogout = () => {
  //   logout()
  // };


    return (
      <nav className = {styles.navbar}>
        <Link href="/" className= {styles.navbar__logo}>
          <img src="/logo.png" alt="Postcare logo" />
          <h5>Postcare</h5>
        </Link>
        {/* <div className={styles.navbar__mobile} onClick={() => setMenuOpen(!menuOpen)}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className={styles.navbar__mobile__icon}/>
        </div> */}
        <ul className={menuOpen ? styles.navbar__itemsActive : styles.navbar__items} onClick={menuOpen ? () => setMenuOpen(!menuOpen) : undefined}>
          { auth ?<>
            <li><Link href="/" className={styles.navbar__link}>Inicio</Link></li>
            <li><Link href="/contactenos" className={styles.navbar__link}>Contactenos</Link></li>
            <li><Link href="/auth/registro" className={`${styles.navbar__link} ${styles.navbar__link__log}`}>Registro</Link></li>
            <li><Link href="/auth/login" className={`${styles.navbar__link} ${styles.navbar__link__sign}`}><div className="bg-secondary px-6 py-3 rounded-md yo">Iniciar Sesión</div></Link></li>
            </> : <>
            <li><Link href="/usuario" className={styles.navbar__link}>Inicio</Link></li>
            <li><Link href="/usuario/registros" className={styles.navbar__link}>Registros</Link></li>
            {/* <li><Link href="/aboutUs" className={styles.navbar__link}>Opraciones</Link></li> */}
            <li><Link href="/" className={`${styles.navbar__link} ${styles.navbar__link__log}`}>cerrar sesión</Link></li>
            </> 
            }
        </ul>       
      </nav>
    );
  }