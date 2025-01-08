import RegisterForm from "@/components/specific/forms/registerForm";
import Card from "@/components/UI/card";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Registro",
  description: "página de registro",
};

export default function Login() {
  return (
    <Card aditionalClasses="max-w-sm">
      <RegisterForm />
    </Card>
  );
}
