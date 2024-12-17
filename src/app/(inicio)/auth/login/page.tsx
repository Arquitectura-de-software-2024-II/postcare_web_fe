import { Metadata } from "next";
import LoginForm from "@/components/Forms/LoginForm";
import FormAround from "@/components/Forms/FormAround";

export const metadata: Metadata = {
  title: "Login",
  description: "página de login",
};

export default function Login() {
  return (
    <FormAround>
      <h4 className="text-primary">Iniciar sesión</h4>
      <LoginForm />
    </FormAround>
  );
}
