import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function FormAround({ children }: Props) {
  return (
    <div className="flex items-center justify-center w-full h-full py-12">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 mb-8 flex flex-col items-center justify-center gap-3">
        {children}
      </div>
    </div>
  );
}
