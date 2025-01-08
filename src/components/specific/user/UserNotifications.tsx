// "use client";

import Alert from "@/components/UI/alert";
// import { getUser } from "@/logic/services/userManagementServices";
// import { postRefreshToken } from "@/logic/services/userManagementServices";
// import { useEffect } from "react";

export default function UserNotifications() {
  // useEffect(() => {
  //   // postRefreshToken()
  //   // const response = getUser();
  //   // console.log(response);
  // }, []);
  

  return (
    <>
      <h3 className="text-primaryColor">Notificaciones</h3>
      
      <div className="flex flex-col mx-auto pt-4 gap-2">
        <Alert type="info" title="Notificación de prueba" message="Este es un mensaje de prueba" />
        <Alert type="danger" title="Notificación de prueba" message="Este es un mensaje de prueba" />
        <Alert type="success" title="Notificación de prueba" message="Este es un mensaje de prueba" />
        <Alert type="warning" title="Notificación de prueba" message="Este es un mensaje de prueba" />
        <Alert type="dark" title="Notificación de prueba" message="Este es un mensaje de prueba" />
      </div>
    </>
  );
}
