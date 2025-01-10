"use client";

import { login } from "@/logic/actions/loginAction";
import Button from "@/components/UI/button";
import ErrorMessage from "@/components/UI/ErrorMessage";
import Input from "@/components/UI/Input";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  const [formData, setFormData] = useState({
    typeId: "",
    userId: "",
    password: "",
  });

  useEffect(() => {
    if (state?.formData) {
      setFormData({
        typeId: state.formData.typeId?.toString() || "",
        userId: state.formData.userId?.toString() || "",
        password: state.formData.password?.toString() || "",
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
        disabled={pending}
        value={formData.typeId}
        onChange={handleChange}
      />
      <Input
        label="Documento de identidad"
        type="text"
        id="userId"
        name="userId"
        placeholder="23123..."
        errorMessage={state?.errors?.userId?.join("/n")}
        disabled={pending}
        value={formData.userId}
        onChange={handleChange}
      />
      <Input
        label="Contraseña"
        type="password"
        id="password"
        name="password"
        placeholder="password"
        errorMessage={state?.errors?.password?.join("/n")}
        disabled={pending}
        value={formData.password}
        onChange={handleChange}
      />
      <Link
        href="#"
        className="ms-auto text-sm text-primaryColor hover:underline "
      >
        Olvido su contraseña?
      </Link>
      {state?.message && <ErrorMessage message={state?.message} />}
      <Button
        label="Iniciar sesión"
        fullWidth={true}
        type="submit"
        loading={pending}
      />
      <div className="text-sm font-medium text-textColor-50">
        No esta registrado?{" "}
        <Link
          href="/auth/registro"
          className="text-primaryColor hover:underline "
        >
          Crear cuenta
        </Link>
      </div>
    </form>
  );
}
