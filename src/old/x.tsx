"use client";

import { useState } from "react";
import Button from "../Button/Button";
import TextField from "../TextField/TextField";
// import { login } from "@/actions/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/features/authApiSlice";
import { useAppDispatch } from "@/redux/hooks";
import { setAuth } from "@/redux/features/authSlice";

export default function RegistroForm() {
  const router = useRouter();
  // const [error, setError] = useState<string | undefined>("");
  // const [success, setSuccess] = useState<string | undefined>("");
  const [login2, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const [visiblePassword, setVisiblePassword] = useState(false);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    const formData = new FormData(e.currentTarget);
    login2({email: formData.get("id"), password: formData.get("password")})
      .unwrap()
      .then(() => {
        // setError(undefined);
        toast.success('Logged in');
        dispatch(setAuth());
        // setSuccess("You have been logged successfully");
        router.push('/logged');
      })
      .catch((e) => {
        toast.error(e.data.detail || "There was an error while login, please try again");
        // setSuccess(undefined);
        // setError(e.data.detail || "There was an error while login, please try again");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Documento de identificación">
        <input id="id" name="id" placeholder="1200940123" />
      </TextField>
      {/* {state?.errors?.id && <p className="error">{state.errors.id}</p>} */}

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
      {/* {state?.errors?.password && (
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
      )} */}

      <Button type="submit">
        Iniciar sesión
      </Button>
    </form>
  );
}