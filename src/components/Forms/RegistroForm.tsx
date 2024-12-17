"use client";

import { useActionState, useState } from "react";
import Button from "../Button/Button";
import TextField from "../TextField/TextField";
import { registro } from "@/actions/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function RegistroForm() {
  const [action, isPending] = useActionState(registro, undefined);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visiblePasswordConfirm, setVisiblePasswordConfirm] = useState(false);

  return (
    <form action={action}>
      <TextField label="Nombres*">
        <input
          id="nombre"
          name="nombre"
          type="text"
          placeholder="Juan Antony"
        />
      </TextField>

      <TextField label="Apellidos*">
        <input
          id="apellido"
          name="apellido"
          type="text"
          placeholder="Muller Trino"
        />
      </TextField>

      <TextField label="Fecha de nacimiento">
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
      </TextField>

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

      <TextField label="Confirmar contraseña*">
        <input
          id="contrasena"
          name="contrasena"
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

      <Button disabled={isPending} type="submit">
        Registrarse
      </Button>
    </form>
  );
}
