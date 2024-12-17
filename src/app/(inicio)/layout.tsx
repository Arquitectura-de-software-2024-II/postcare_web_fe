
import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { redirect } from "next/navigation";
config.autoAddCss = false

interface Props {
  children: React.ReactNode;
}

export default function Layout3({ children }: Props) {

  // const cookie = (await cookies()).get('session')?.value
  const session = false;

  if (session) {
    redirect('/usuario')
  }

  return (
    <>
      <Navbar auth={true}/>
      <main className="content">{children}</main>
      <Footer/>
    </>
  );
}