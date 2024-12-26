"use client";

import Navbar from "@/components/Navbar/Navbar";
import { useUser } from "@/context/userContext";
import { redirect } from "next/navigation";
// import { useUser } from "@/hooks/useAuth";

interface Props {
  children: React.ReactNode;
}

export default function LayoutUser({ children }: Props) {
  const { user } = useUser();

  if (!user?.autenticado) {
    redirect("/");
  }

  return (
    <>
      <Navbar auth={false} />
      <main className="min-h-screen py-10">{children}</main>
    </>
  );
}
