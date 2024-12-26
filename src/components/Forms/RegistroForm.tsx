"use client";

import { useState } from "react";
import Button from "../Button/Button";
import TextField from "../TextField/TextField";
// import { registro } from "@/actions/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { SignupFormSchema } from "@/models/definitions";
// import { set } from "zod";
// import { SignupFormSchema } from "@/models/definitions";

export default function RegistroForm() {
  const router = useRouter();
  // const [action, isPending] = useActionState(registro, undefined);

  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visiblePasswordConfirm, setVisiblePasswordConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    setGeneralError(null);

    // Crear el objeto con los datos del formulario
    const formData = new FormData(e.currentTarget);
    // const fechaCirugia = formData.get("fechaCirugia");
    // const date = fechaCirugia ? new Date(fechaCirugia.toString()) : new Date();

    const validatedFields = SignupFormSchema.safeParse({
      nombre: formData.get("nombre"),
      apellido: formData.get("apellido"),
      id_document: formData.get("id"),
      password: formData.get("contrasena"),
      re_password: formData.get("confirmarContrasena"),
    });

    if (!validatedFields.success) {
      setErrors(validatedFields.error.flatten().fieldErrors);
    } else {
      setErrors({});
      try {
        await axios.post(
          "http://localhost:8000/auth/users/",
          validatedFields.data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        toast.success("Usuario registrado correctamente");
        //console.log(response);
        router.push(`/auth/login`);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setGeneralError(error.response.data.detail);
        } else {
          setGeneralError("An error occurred");
        }
        // console.log(error);
      }
    }
  };

  return (
    // <form action={action}>
    <form onSubmit={handleSubmit}>
      <TextField label="Nombres*">
        <input id="nombre" name="nombre" type="text" placeholder="Juan" />
      </TextField>
      {errors?.nombre && <p className="error">{errors?.nombre}</p>}

      <TextField label="Apellidos*">
        <input id="apellido" name="apellido" type="text" placeholder="Muller" />
      </TextField>
      {errors?.apellido && <p className="error">{errors?.apellido}</p>}

      <TextField label="Documento de identidad*">
        <input id="id" name="id" type="text" placeholder="10055..." />
      </TextField>
      {errors?.id_document && <p className="error">{errors?.id_document}</p>}

      {/* <TextField label="Fecha de nacimiento">
        <input id="nacimiento" name="nacimiento" type="date" />
      </TextField>

      <TextField label="Género*">
        <select id="genero" name="genero">
          <option value="" selected>Elija una opción</option>
          <option value="volvo">Femenino</option>
          <option value="saab">Masculino</option>
          <option value="fiat">Otro</option>
        </select>
      </TextField>

      <TextField label="Tipo de sangre">
        <select id="sangre" name="sangre">
          <option value="" selected>Elija una opción</option>
          <option value="volvo">O+</option>
          <option value="saab">O-</option>
          <option value="volvo">A+</option>
          <option value="saab">A-</option>
          <option value="volvo">B+</option>
          <option value="saab">B-</option>
          <option value="volvo">AB+</option>
          <option value="saab">AB-</option>
        </select>
      </TextField> 

      <TextField label="Correo*">
        <input id="correo" name="correo" placeholder="Juan@mymail.com" />
      </TextField>

      <TextField label="Teléfono*">
        <input id="telefono" name="telefono" placeholder="34234312312" />
      </TextField>*/}

      <TextField label="Contraseña*">
        <input
          id="contrasena"
          name="contrasena"
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

      <TextField label="Confirmar contraseña*">
        <input
          id="confirmarContrasena"
          name="confirmarContrasena"
          type={visiblePasswordConfirm ? "text" : "password"}
          placeholder="******"
        />
        {!visiblePasswordConfirm ? (
          <FontAwesomeIcon
            icon={faEyeSlash}
            onClick={() => setVisiblePasswordConfirm(!visiblePasswordConfirm)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faEye}
            onClick={() => setVisiblePasswordConfirm(!visiblePasswordConfirm)}
          />
        )}
      </TextField>

      {errors?.re_password && (
        <div>
          <ul className="pl-1">
            {errors.re_password.map((error) => (
              <li className="error" key={error}>
                {error}
              </li>
            ))}
          </ul>
        </div>
      )} 

    {generalError && (
            <div>
              <p className="error">
              {generalError}
              </p>
            </div>
          )} 

      <Button type="submit">Registrarse</Button>
    </form>
  );
}
