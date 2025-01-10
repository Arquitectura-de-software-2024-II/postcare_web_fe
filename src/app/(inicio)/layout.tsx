import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function InicioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-20 flex justify-center items-center flex-col">{children}</main>
      <Footer />
    </div>
  );
}
