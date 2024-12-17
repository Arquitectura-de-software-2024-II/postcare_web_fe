import Navbar from "@/components/Navbar/Navbar";
// import { useUser } from "@/hooks/useAuth";

interface Props {
  children: React.ReactNode;
}

export default function LayoutUser({ children }: Props) {
    // const { isLoading, isError } = useUser();

    // if (isLoading) return <p>Cargando...</p>;
    // if (isError) return <p>No autenticado</p>;

    return (
        <>
          <Navbar auth={false}/>
          <main className="min-h-screen py-10">{children}</main>
        </>
      );
}