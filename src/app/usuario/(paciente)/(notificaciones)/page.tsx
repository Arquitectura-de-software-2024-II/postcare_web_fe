import ListNews from "@/components/specific/user/ListNews";
import UserNotifications from "@/components/specific/user/UserNotifications";
import Card from "@/components/UI/card";

export default function Inicio() {
  return (
    <>
      <Card aditionalClasses="max-w-3xl">
        <UserNotifications />
      </Card>
      <Card aditionalClasses="max-w-3xl">
        <ListNews />
      </Card>
    </>
  );
}
