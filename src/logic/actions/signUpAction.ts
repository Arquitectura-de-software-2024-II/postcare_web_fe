import {
  SignupFormSchema,
  SignUpFormState,
} from "@/logic/lib/signUpDefinitions";
import CryptoJS from "crypto-js";
import { redirect } from "next/navigation";
import { postRegister } from "../services/userManagementServices";
import { toast } from "react-toastify";

export async function signup(state: SignUpFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    names: formData.get("names"),
    surnames: formData.get("surnames"),
    email: formData.get("email"),
    typeId: formData.get("typeId"),
    userId: formData.get("userId"),
    password: formData.get("password"),
    repassword: formData.get("repassword"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      formData: {
        names: formData.get("names"),
        surnames: formData.get("surnames"),
        email: formData.get("email"),
        typeId: formData.get("typeId"),
        userId: formData.get("userId"),
        password: formData.get("password"),
        repassword: formData.get("repassword"),
      },
    };
  }

  // 2. Prepare data for insertion into database
  const { names, surnames, email, typeId, userId, password } =
    validatedFields.data;
  // e.g. Hash the user's password before storing it
  const hashedPassword = await CryptoJS.SHA256(password).toString();

  // 3. Insert the user into the database or call an Auth Library's API
  const response = await postRegister({
    nombres: names,
    apellidos: surnames,
    email: email,
    tipo_documento: typeId,
    id_documento: userId,
    password: hashedPassword,
    re_password: hashedPassword,
  });

  if (response.awaitState == "success") {
    toast.success("Cuenta creada exitosamente");
    redirect("/auth/login");
  } else {

    if (
      response.error.id_documento ==
      "usuario with this id documento already exists."
    ) {
      return {
        message: "Ya existe un usuario con este número de documento",
      };
    } else if (
      response.error.email == "usuario with this email already exists."
    ) {
      return {
        message: "Ya existe una cuenta con este correo electrónico",
      };
    } else {
      return {
        message: "Hubo un error creando la cuenta",
      };
    }
  }
}
