"use client";

import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import { useUser } from '@/context/userContext';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { redirect } from "next/navigation";
config.autoAddCss = false

interface Props {
  children: React.ReactNode;
}

export default function Layout3({ children }: Props) {

  // const { user } = useUser();

  // if (user?.autenticado) {
  //   redirect('/usuario')
  // }

  return (
    <>
      <Navbar auth={true}/>
      <main className="content">{children}</main>
      <Footer/>
    </>
  );
}
