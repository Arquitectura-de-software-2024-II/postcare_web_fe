import { z } from "zod";

export const LoginFormSchema = z
  .object({
    typeId: z
      .string()
      .min(1, { message: "Por favor seleccione un tipo de documento de identificación." })
      .trim(),
    userId: z.string().min(1, { message: "Ingrese un numero de identificación por favor." }).trim(),
    password: z
      .string()
      .min(8, { message: "Debe tener al menos 8 caracteres de longitud." })
      .regex(/[0-9]/, { message: "Debe contener al menos 1 número." })
      .trim(),
   });

export type LoginFormState =
  | {
      errors?: {
        typeId?: string[];
        userId?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
