import type { Metadata } from "next";
import "@/styles/globals.css";
import { Poppins, Inter } from "next/font/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomProvider from "@/util/Providers";
import Provider from "@/redux/provider";
import { UserProvider } from "@/context/userContext";
import { ToastContainer } from "react-toastify";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Postcare",
  description: "App para gestión de pacientes posoperatorios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <CustomProvider>
          <Provider>
          <UserProvider>{children}</UserProvider>
          <ToastContainer />
          </Provider>
        </CustomProvider>
      </body>
    </html>
  );
}
