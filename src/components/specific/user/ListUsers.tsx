"use client";

import InfoSkeleton from "@/components/UI/skeleton/InfoSkeleton";
import Table from "@/components/UI/Table";
import { useGetListUsers} from "@/logic/hooks/useUser";
import { userInfo } from "@/logic/models/userModel";

export default function ListUsers() {

    const {data: users, isLoading} = useGetListUsers();

    if (isLoading || !users) {
        return <InfoSkeleton/>
    }

    if (!Array.isArray(users)) {
      return <div>Error cargando los datos</div>;
    }

    const headers = [
      'Id',
      'Triage',
      'Nombres',
      'Apellidos',
      'Correo',
      'Telefono',
      
      // <span className="sr-only" key={1}>Edit</span>,
    ];

   
    const rows =  users && users.map((user: userInfo) => {
      return [
        user.id_documento,
        user.triage,
        user.nombres,
        user.apellidos,
        user.email,
        "",
        
        // <a href="#" className="font-medium text-blue-600 hover:underline" key={user.id}>Edit</a>,
      ];
    });

    return (
      <div >
        <h3 className="text-primaryColor text-3xl mb-4">Usuarios:</h3>
        <Table headers={headers} rows={rows} />
      </div>
    );
}
