"use server";

import {
  SignupFormSchema,
  LoginFormSchema,
  FormRegistroState,
  FormLoginState,
} from "@/models/definitions";
import { redirect } from "next/navigation";
import { loginRequest, signupRequest } from "@/services/auth";
// import bcrypt from "bcryptjs";

export async function login(state: FormLoginState, formData: FormData) {
  // 1. Validar campos
  const validatedFields = LoginFormSchema.safeParse({
    id: formData.get("id"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Hacer la solicitud al backend
  const { id, password } = validatedFields.data;
  try {
    const { token } = await loginRequest({ id, password});

    // Guardar el token en cookies o localStorage (dependiendo de tu caso)
    document.cookie = `token=${token}; path=/`;

    // Redirigir al usuario
    redirect("/usuario");
  } catch {
    return {"error": "Error al iniciar sesión. Intenta más tarde."};
  }
}

export async function registro(state: FormRegistroState, formData: FormData) {
  // 1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

 // 2. Realizar la solicitud de registro
  const { name, email, password } = validatedFields.data;

  try {
    const { token } = await signupRequest({ name, email, password });

    // Guardar el token en cookies o localStorage
    document.cookie = `token=${token}; path=/`;

    // Redirigir al usuario a su perfil o dashboard
    redirect("/usuario");
  } catch (error) {
    return {
      error: {error}
      //errors: { general: "Error al registrar al usuario. Intenta más tarde." },
    };
  }
}