import { z } from "zod";

export const LoginFormSchema = z.object({
  id_document: z
    .string()
    .min(2, { message: "El documento debe ser de mínimo 2 valores" })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Escribe una contraseña válida" })
    //.regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    //.regex(/[0-9]/, { message: 'Contain at least one number.' })
    //.regex(/[^a-zA-Z0-9]/, {
    //  message: 'Contain at least one special character.',
    //})
    .trim(),
});

export const SignupFormSchema = z.object({
  nombre: z
    .string()
    .min(2, { message: "El nombre debe ser de mínimo 2 letras." })
    .trim(),
  apellido: z
    .string()
    .min(2, { message: "El apellido debe ser de mínimo 2 letras." })
    .trim(),
  id_document: z
    .string()
    .min(2, { message: "Por favor ingrese un documento de identidad válido." })
    .trim(),
  password: z
    .string()
    .min(8, { message: "La contraseña debe ser de mínimo 8 caracteres" })
    //.regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    //.regex(/[0-9]/, { message: 'Contain at least one number.' })
    //.regex(/[^a-zA-Z0-9]/, {
    //  message: 'Contain at least one special character.',
    //})
    .trim(),
  re_password: z.string(),
}) .refine((data) => data.password === data.re_password, {
  message: "Las contraseñas no coinciden",
  path: ["re_password"],
});;

export type FormRegistroState =
  | {
      errors?: {
        nombre?: string[];
        apellido?: string[];
        id_document?: string[];
        password?: string[];
        re_password?: string[];
      };
      message?: string;
    }
  | undefined;

export type FormLoginState =
  | {
      errors?: {
        id_document?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined
  | string;
