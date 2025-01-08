"use client";

import { signup } from "@/logic/actions/signUpAction";
import Button from "@/components/UI/button";
import ErrorMessage from "@/components/UI/errorMessage";
import Input from "@/components/UI/Input";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";

export default function RegisterForm() {

  const [state, action, pending] = useActionState(signup, undefined);
  
  const [formData, setFormData] = useState({
    names: "",
    surnames: "",
    email: "",
    typeId: "",
    userId: "",
    password: "",
    repassword: "",
  });

  useEffect(() => {
    if (state?.formData) {
      setFormData({
        names:
          typeof state.formData.names === "string" ? state.formData.names : "",
        surnames:
          typeof state.formData.surnames === "string"
            ? state.formData.surnames
            : "",
        email:
          typeof state.formData.email === "string" ? state.formData.email : "",
        typeId:
          typeof state.formData.typeId === "string"
            ? state.formData.typeId
            : "",
        userId:
          typeof state.formData.userId === "string"
            ? state.formData.userId
            : "",
        password:
          typeof state.formData.password === "string"
            ? state.formData.password
            : "",
        repassword:
          typeof state.formData.repassword === "string"
            ? state.formData.repassword
            : "",
      });
    }
  }, [state?.formData]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className="space-y-6" action={action}>
      <h3 className="text-primaryColor text-center">Registrarse</h3>
      <Input
        label="Nombres*"
        name="names"
        id="names"
        placeholder="John"
        type="text"
        errorMessage={state?.errors?.names?.join("")}
        value={formData.names}
        onChange={handleChange}
        disabled={pending}
      />
      <Input
        label="Apellidos*"
        name="surnames"
        id="surnames"
        placeholder="Doe"
        type="text"
        errorMessage={state?.errors?.surnames?.join("")}
        value={formData.surnames}
        onChange={handleChange}
        disabled={pending}
      />
      <Input
        label="Correo*"
        type="email"
        name="email"
        id="email"
        placeholder="miCorreo@micorreo.com"
        errorMessage={state?.errors?.email?.join("")}
        value={formData.email}
        onChange={handleChange}
        disabled={pending}
      />

      <Input
        label="Tipo de documento de identidad*"
        name="typeId"
        id="typeId"
        options={[
          { value: "CC", label: "Cédula de ciudadanía" },
          { value: "TI", label: "Tarjeta de identidad" },
          { value: "CE", label: "Cédula de extranjería" },
          { value: "PAS", label: "Pasaporte" },
        ]}
        errorMessage={state?.errors?.typeId?.join("")}
        value={formData.typeId}
        onChange={handleChange}
        disabled={pending}
      />

      <Input
        label="Documento de identidad*"
        name="userId"
        id="userId"
        placeholder="534535..."
        type="text"
        errorMessage={state?.errors?.userId?.join("")}
        value={formData.userId}
        onChange={handleChange}
        disabled={pending}
      />
      <Input label="Fecha de nacimiento*" name="birth" id="birth" type="date" />
      <Input
        label="Contraseña*"
        type="password"
        name="password"
        id="password"
        placeholder="••••••••"
        explanationMessage="La contraseña debe tener al menos 8 caracteres y un número"
        errorMessage={state?.errors?.password?.join("/n")}
        value={formData.password}
        onChange={handleChange}
        disabled={pending}
      />
      <Input
        label="Confirmar contraseña*"
        type="password"
        name="repassword"
        id="repassword"
        placeholder="••••••••"
        errorMessage={state?.errors?.repassword?.join("/n")}
        value={formData.repassword}
        onChange={handleChange}
        disabled={pending}
      />
      {state?.message && <ErrorMessage message={state?.message} />}
      <Button
        label="Registrarse"
        fullWidth={true}
        type="submit"
        loading={pending}
      />
      <div className="text-sm font-medium text-textColor-50">
        Ya esta registrado?{" "}
        <Link href="/auth/login" className="text-primaryColor hover:underline ">
          Iniciar sesión
        </Link>
      </div>
    </form>
  );
}
