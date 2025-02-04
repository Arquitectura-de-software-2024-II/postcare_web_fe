import ListUsers from "@/components/specific/user/ListUsers";
import Card from "@/components/UI/card";

export default function PageUsuarios() {

  return (
    <Card aditionalClasses="max-w-5xl">
      <ListUsers />
    </Card>
  );
}
