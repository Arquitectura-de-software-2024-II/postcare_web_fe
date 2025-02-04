"use client";

import { LoginFormSchema, LoginFormState } from "@/logic/lib/loginDefinitions";
import CryptoJS from "crypto-js";
import { redirect } from "next/navigation";
import { postLogin } from "@/logic/services/userManagementServices";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

export async function login(state: LoginFormState, formData: FormData) {
  // export async function login(state: LoginFormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    typeId: formData.get("typeId"),
    userId: formData.get("userId"),
    password: formData.get("password"),
  });
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      formData: {
        typeId: formData.get("typeId"),
        userId: formData.get("userId"),
        password: formData.get("password"),
      },
    };
  }
  // 2. Prepare data for insertion into database
  const { typeId, userId, password } = validatedFields.data;
  // e.g. Hash the user's password before storing it
  const hashedPassword = await CryptoJS.SHA256(password).toString();
  // console.log(hashedPassword);

  const response = await postLogin({
    tipo_documento: typeId,
    id_documento: userId,
    password: hashedPassword,
  });

  // // console.log(response);

  if (response.awaitState == "success") {
    toast.success("Inicio de sesión exitoso");
    redirect("/usuario");
  } else {
    if (
      response.error.detail ==
      "No active account found with the given credentials"
    ) {
      return {
        message:
          "No se encontró una cuenta activa con las credenciales proporcionadas",
      };
    } else {
      return {
        message: "Hubo un error al iniciar sesión, intentelo más tarde",
      };
    }
  }
}
