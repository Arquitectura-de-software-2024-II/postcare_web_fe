import { Metadata } from "next";
import RegistroForm from "@/components/Forms/RegistroForm";
import FormAround from "@/components/Forms/FormAround";

export const metadata: Metadata = {
  title: "Login",
  description: "página de login",
};

export default function Login() {
  return (
    <FormAround>
      <h4 className="text-primary">Registro</h4>
      <RegistroForm />
    </FormAround>
  );
}
