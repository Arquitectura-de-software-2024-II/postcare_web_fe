
import ContactUs from "@/components/specific/home/contact/ContactUs";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: 'Contactenos',
	description: 'página de contacto',
};

export default function Contactenos() {
  return (
    <ContactUs />
  );
}