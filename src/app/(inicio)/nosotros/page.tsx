import FirstSectionAbout from "@/components/specific/home/about/FirstSectionAbout";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: 'Nosotros',
	description: 'página de información sobre la aplicación',
};

export default function Nosotros() {
  return (
    <div >
        <FirstSectionAbout />
    </div>
  );
}