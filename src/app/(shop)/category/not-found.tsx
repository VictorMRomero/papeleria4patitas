import { redirect } from "next/navigation";

// Categoría inexistente: redirige al inicio.
function notFound() {
  redirect("/");
}

export default notFound;
