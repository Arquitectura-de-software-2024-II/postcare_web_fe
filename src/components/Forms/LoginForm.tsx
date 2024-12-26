"use client";

import { useState } from "react";
import Button from "../Button/Button";
import TextField from "../TextField/TextField";
// import { login } from "@/actions/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { LoginFormSchema } from "@/models/definitions";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";


export default function RegistroForm() {
  // const [state, action, isPending] = useActionState(login, undefined);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setUser } = useUser();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    setGeneralError(null);

    // Crear el objeto con los datos del formulario
    const formData = new FormData(e.currentTarget);

    const validatedFields = LoginFormSchema.safeParse({
      id_document: formData.get("id"),
      password: formData.get("password"),
    });

    setIsLoading(true);

    if (!validatedFields.success) {
      setErrors(validatedFields.error.flatten().fieldErrors);
    } else {
      setErrors({});
      try {
        const response = await axios.post(
          "http://localhost:8000/auth/jwt/create/",
          validatedFields.data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { access, refresh } = response.data;


        Cookies.set("accessToken", access, { expires: 1 }); // 1 día
        Cookies.set("refreshToken", refresh, { expires: 7 }); // 7 días

        setUser({ id: validatedFields.data.id_document, autenticado: true });
        queryClient.invalidateQueries({ queryKey: ["useOperations","userRecords"] });
        toast.success("Inicio de sesión exitoso");
        router.push(`/usuario`);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setGeneralError(error.response.data.detail);
        } else {
          setGeneralError("Hubo un error al realizar la solicitud");
        }
      }
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Documento de identificación">
        <input id="id" name="id" placeholder="1200..." />
      </TextField>
      {errors?.id_document && <p className="error">{errors?.id_document}</p>}

      <TextField label="Contraseña">
        <input
          id="passsword"
          name="password"
          type={visiblePassword ? "text" : "password"}
          placeholder="******"
        />
        {!visiblePassword ? (
          <FontAwesomeIcon
            icon={faEyeSlash}
            onClick={() => setVisiblePassword(!visiblePassword)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faEye}
            onClick={() => setVisiblePassword(!visiblePassword)}
          />
        )}
      </TextField>
      {errors?.password && (
        <div>
          <ul className="pl-1">
            {errors.password.map((error) => (
              <li className="error" key={error}>
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}
      {generalError && <p className="error">{generalError}</p>}
      <Button type="submit" disabled={isLoading}>{isLoading? "cargando...":"Iniciar sesión"}</Button>
    </form>
  );
}
