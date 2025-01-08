"use client";

import Button from "@/components/UI/button";
import Card from "@/components/UI/card";
import axios from "axios";

export default function PerfilUsuario() {
    // const [isDefaultModalOpen, setDefaultModalOpen] = useState(false);
  // const [isPopupModalOpen, setPopupModalOpen] = useState(false);
  const handleDeleteAccount = () => {
    const instance = axios.create({
      withCredentials: true,
    });

    try {
      instance.request({
        url: "http://localhost:8000/auth/users/me/",
        method: "delete",
        data: {
            current_password: "5a63e75a6e7a09f1f2bbded46dd2acae2211c972f09f109c822cd7cc06db0db6",
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card aditionalClasses="max-w-3xl">
      <Button label="Eliminar cuenta" onClick={handleDeleteAccount} />
    </Card>
    /* <Button label="popup" onClick={() => setPopupModalOpen(true)} />
      <Button label="default" onClick={() => setDefaultModalOpen(true)} />
      <Modal
        isOpen={isDefaultModalOpen}
        onClose={() => setDefaultModalOpen(false)}
        title="Terms of Service"
        content={
          <>
            <p className="text-base leading-relaxed text-gray-500 ">
              With less than a month to go before the European Union enacts new
              consumer privacy laws for its citizens...
            </p>
            <p className="text-base leading-relaxed text-gray-500 ">
              The European Union’s General Data Protection Regulation (G.D.P.R.)
              goes into effect on May 25...
            </p>
          </>
        }
        footerButtons={<Button label="I accept" onClick={() => setDefaultModalOpen(false)}/>}
      />
      <Modal
        isOpen={isPopupModalOpen}
        onClose={() => setPopupModalOpen(false)}
        type="popup"
        content={
          <>
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 "
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 ">
              Are you sure you want to delete this product?
            </h3>
          </>
        }
        footerButtons={
          <>
        <Button label="Yes, I'm sure" color="error"/>
        <Button label="No, cancel" onClick={() => setPopupModalOpen(false)}/>
          </>
        }
      /> */
  );
}
