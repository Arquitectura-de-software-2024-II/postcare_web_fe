import { z } from "zod";

export const SignupFormSchema = z
  .object({
    names: z
      .string()
      .min(2, { message: "Ingrese un nombre valido por favor." })
      .trim(),
    surnames: z
      .string()
      .min(2, { message: "Ingrese un apellido valido por favor." })
      .trim(),
    email: z.string().email({ message: "Ingrese un correo valido por favor." }).trim(),
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
    acceptTerms: z.string().min(1, { message: "Debe aceptar los términos y condiciones." }),
    repassword: z.string(),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Las contraseñas no coinciden",
    path: ["repassword"],
  });

export type SignUpFormState =
  | {
      errors?: {
        names?: string[];
        surnames?: string[];
        userId?: string[];
        typeId?: string[];
        email?: string[];
        password?: string[];
        repassword?: string[];
        acceptTerms?: string[];
      };
      message?: string;
    }
  | undefined;

export type SessionPayload = {
  userId: string;
  expiresAt: Date;
};
