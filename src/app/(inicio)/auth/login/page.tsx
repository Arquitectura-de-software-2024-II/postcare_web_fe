import LoginForm from "@/components/specific/forms/loginForm";
import Card from "@/components/UI/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "página de login",
};

export default function Login() {
  return (
    <Card aditionalClasses="max-w-sm">
      <LoginForm />
    </Card>
  );
}
