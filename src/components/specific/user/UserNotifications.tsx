import Alert from "@/components/UI/alert";

export default function UserNotifications() {
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
