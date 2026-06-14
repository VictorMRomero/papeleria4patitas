import { redirect } from "next/navigation";

// Página por defecto para cualquier ruta inexistente: redirige al inicio.
export default function NotFound() {
  redirect("/");
}
