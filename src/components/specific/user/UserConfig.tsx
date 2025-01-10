"use client";

import Button from "@/components/UI/button";
import Input from "@/components/UI/Input";
import Modal from "@/components/UI/Modal";
import { useDeleteAccount } from "@/logic/hooks/useUser";
import { faLock, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import CryptoJS from "crypto-js";

export default function UserConfig() {
  const [isDeleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);
  const [isUpdatePasswordModalOpen, setUpdatePasswordModalOpen] = useState(false);
  const [password, setPassword] = useState<string>("");
  const { mutate: deleteAccount, status} = useDeleteAccount(password);
  console.log(status);

  async function handlePasswordChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ): Promise<void> {
    const { value } = e.target;
    const hashedPassword = await CryptoJS.SHA256(value).toString();
    setPassword(hashedPassword);
  }

  const configOptions = [
    {
      label: "Cambiar contraseña",
      onClick: () => setUpdatePasswordModalOpen(true),
      icon: faLock,
    },
    {
      label: "Eliminar cuenta ",
      onClick: () => setDeleteAccountModalOpen(true),
      icon: faTrashCan,
    },
  ];

  return (
    <>
      {configOptions.map((option, index) => (
        <div
          key={index}
          className="w-full flex flex-row justify-start items-center gap-6 border-b border-grayColor-20 px-6 py-4 rounded-lg hover:bg-backgroundColor"
          onClick={option.onClick}
        >
          <FontAwesomeIcon icon={option.icon} />
          <p className="text-lg">{option.label}</p>
        </div>
      ))}
      <Modal
        isOpen={isDeleteAccountModalOpen}
        onClose={() => setDeleteAccountModalOpen(false)}
        type="popup"
        defaultDelete={true}
        content={
          <>
            <p className="mb-6">
              ¿Está seguro que desea eliminar su cuenta?, una vez eliminada no
              podrá recuperar su información. Por favor ingrese su contraseña
              actual para confirmar la eliminacion de su cuenta
            </p>

            <Input onChange={handlePasswordChange} type="password"/>
          </>
        }
        footerButtons={
          <>
            <Button
              label="Si, eliminar"
              color="error"
              onClick={deleteAccount}
              loading={status === "pending"}
            />
            <Button
              label="No, cancelar"
              onClick={() => setDeleteAccountModalOpen(false)}
            />
          </>
        }
      />
      <Modal
        isOpen={isUpdatePasswordModalOpen}
        onClose={() => setUpdatePasswordModalOpen(false)}
        type="popup"
        defaultDelete={true}
        content={
          <>
            <p className="mb-6">
              ¿Está seguro que desea eliminar su cuenta?, una vez eliminada no
              podrá recuperar su información. Por favor ingrese su contraseña
              actual para confirmar la eliminacion de su cuenta
            </p>

            <Input onChange={handlePasswordChange} type="password"/>
          </>
        }
        footerButtons={
          <>
            <Button
              label="Si, eliminar"
              color="error"
              onClick={deleteAccount}
              loading={status === "pending"}
            />
            <Button
              label="No, cancelar"
              onClick={() => setUpdatePasswordModalOpen(false)}
            />
          </>
        }
      />
    </>
  );
}
