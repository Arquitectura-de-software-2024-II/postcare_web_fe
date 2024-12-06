

interface Props {
  children: React.ReactNode;
}

export default function Layout3({ children }: Props) {
  return (
    <>
      {/* <Navbar /> */}
      <main className="content">{children}</main>

    </>
  );
}