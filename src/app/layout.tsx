import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/toasts.css";
import "@/styles/typography.css";
import { ToastContainer } from "react-toastify";
import ReactQueryProvider from "@/app/util/ReactQueryProvider";
import { UserProvider } from "./util/UserProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
      <head>
        <link rel="icon" type="image/png" href="/logo.png" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <ToastContainer theme="colored" />
        <UserProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </UserProvider>
      </body>
    </html>
  );
}
