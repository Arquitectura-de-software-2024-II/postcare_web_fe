import {
  SignupFormSchema,
  SignUpFormState,
} from "@/logic/lib/signUpDefinitions";
import CryptoJS from "crypto-js";
import { redirect } from "next/navigation";
import { postRegister } from "../services/userManagementServices";
import { toast } from "react-toastify";
import { createUserPostoperation } from "../services/postoperationServices";

export async function signup(state: SignUpFormState, formData: FormData) {
  console.log(formData.get("acceptTerms"));
  if (formData.get("acceptTerms") !== "on") {
    return {
      message: "Debe aceptar los términos y condiciones para continuar",
    };
  }

  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    names: formData.get("names"),
    surnames: formData.get("surnames"),
    email: formData.get("email"),
    typeId: formData.get("typeId"),
    userId: formData.get("userId"),
    password: formData.get("password"),
    repassword: formData.get("repassword"),
    acceptTerms: formData.get("acceptTerms"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
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
    console.log(response);
    if (response.data && response.data.id !== null) {
      await createUserPostoperation(response.data.id.toString());
    }
    toast.success("Cuenta creada exitosamente");
    redirect("/auth/login");
  } else {
    if (
      response.error.id_documento ==
      "usuario with this id documento already exists."
    ) {
      return {
        message: "Ya existe un usuario con este número de documento de identidad.",
      };
    } else if (
      response.error.email == "usuario with this email already exists."
    ) {
      return {
        message: "Ya existe una cuenta con este correo electrónico.",
      };
    } else {
      return {
        message: "Hubo un error creando la cuenta.",
      };
    }
  }
}
