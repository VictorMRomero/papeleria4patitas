import { redirect } from "next/navigation";

// Producto inexistente: redirige al inicio.
function notFoundPage() {
  redirect("/");
}

export default notFoundPage;
