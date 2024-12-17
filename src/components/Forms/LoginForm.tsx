"use client";

import { useActionState, useState } from "react";
import Button from "../Button/Button";
import TextField from "../TextField/TextField";
import { login } from "@/actions/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function RegistroForm() {
  const [state, action, isPending] = useActionState(login, undefined);
  const [visiblePassword, setVisiblePassword] = useState(false);

  return (
    <form action={action}>
      <TextField label="Documento de identificación">
        <input id="id" name="id" placeholder="1200940123" />
      </TextField>
      {state?.errors?.id && <p className="error">{state.errors.id}</p>}

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
      {state?.errors?.password && (
        <div>
          <p className="error">La contraseña debe:</p>
          <ul className="pl-1">
            {state.errors.password.map((error) => (
              <li className="error" key={error}>
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button disabled={isPending} type="submit">
        Iniciar sesión
      </Button>
    </form>
  );
}
