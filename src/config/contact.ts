// Datos de contacto del negocio.
//
// WHATSAPP_NUMBER: número en formato internacional, SOLO dígitos (código de país + número).
//   Ej. México: 52 + 10 dígitos  ->  '5215512345678'
//   ⚠️ Reemplazar el placeholder de abajo por el número real del negocio.
export const WHATSAPP_NUMBER = '5224112390677';

// Construye el enlace de WhatsApp (wa.me) con un mensaje opcional pre-cargado.
export const whatsappUrl = (
  message = 'Hola 👋, vengo de la web de Papelería 4 Patitas y quiero más información.'
) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
