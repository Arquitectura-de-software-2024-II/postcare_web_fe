"use client";

import { signup } from "@/logic/actions/signUpAction";
import Button from "@/components/UI/button";
import ErrorMessage from "@/components/UI/ErrorMessage";
import Input from "@/components/UI/Input";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import Modal from "@/components/UI/Modal";

export default function RegisterForm() {
  const [state, action, pending] = useActionState(signup, undefined);
  const [isTermsModalOpen, setTermsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    names: "",
    surnames: "",
    email: "",
    typeId: "",
    userId: "",
    password: "",
    repassword: "",
    acceptTerms: false,
  });

  useEffect(() => {
    if (state?.formData) {
      setFormData({
        names: state.formData.names?.toString() || "",
        surnames: state.formData.surnames?.toString() || "",
        email: state.formData.email?.toString() || "",
        typeId: state.formData.typeId?.toString() || "",
        userId: state.formData.userId?.toString() || "",
        password: state.formData.password?.toString() || "",
        repassword: state.formData.repassword?.toString() || "",
        acceptTerms: false, // Inicializar el nuevo campo
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
    <>
      <form className="space-y-6" action={action}>
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
        <Input
          label="Fecha de nacimiento*"
          name="birth"
          id="birth"
          type="date"
        />
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
        <div className="flex items-center">
          <input
            type="checkbox"
            name="acceptTerms"
            id="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            disabled={pending}
            className="mr-2"
          />
          <label
            htmlFor="acceptTerms"
            className="text-primaryColor hover:underline"
            onClick={() => setTermsModalOpen(true)}
          >
            Acepto los términos y condiciones
          </label>
        </div>
        {state?.message && <ErrorMessage message={state?.message} />}
        <Button
          label="Registrarse"
          fullWidth={true}
          type="submit"
          loading={pending}
        />
        <div className="text-sm font-medium text-textColor-50">
          Ya esta registrado?{" "}
          <Link
            href="/auth/login"
            className="text-primaryColor hover:underline "
          >
            Iniciar sesión
          </Link>
        </div>
      </form>

      <Modal
        isOpen={isTermsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        title="Terminos y condiciones"
        content={
          <>
            <p className="text-base leading-relaxed text-gray-500 ">
              Este portal web es propiedad de la empresa...
            </p>
            <p className="text-base leading-relaxed text-gray-500 ">
              The European Unions General Data Protection Regulation (G.D.P.R.)
              goes into effect on May 25...
            </p>
          </>
        }
        footerButtons={
          <Button label="Cerrar" onClick={() => setTermsModalOpen(false)} />
        }
      />
    </>
  );
}
