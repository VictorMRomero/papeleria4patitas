import { IoLogoWhatsapp } from "react-icons/io5";
import { whatsappUrl } from "@/config/contact";

// Botón flotante de WhatsApp, visible en todo el sitio para dar seguimiento.
export const WhatsappButton = () => (
  <a
    href={whatsappUrl()}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Contáctanos por WhatsApp"
    className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 p-4"
  >
    <IoLogoWhatsapp className="w-7 h-7" />
    <span className="hidden sm:inline pr-1 font-medium">WhatsApp</span>
  </a>
);
