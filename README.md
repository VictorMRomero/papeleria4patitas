Este es un proyecto realizado con [Next.js](https://nextjs.org/)

## Descripcion

**Papelería 4 Patitas** es una aplicación web de comercio electrónico desarrollada con Next.js 15. El proyecto utiliza una API externa especializada para todas las operaciones de base de datos, manteniendo una arquitectura limpia y separada.

### Características principales:
- 🛒 **Sistema de carrito de compras** con Zustand
- 👤 **Autenticación de usuarios** con JWT
- 📦 **Gestión de productos y categorías**
- 🏠 **Sistema de direcciones de envío**
- 💳 **Procesamiento de órdenes**
- 📱 **Diseño responsive** con Tailwind CSS
- 🎨 **Tema claro/oscuro** con next-themes
- 🔍 **Búsqueda de productos**
- 📊 **Panel de administración**

Pasos para correr el servidor:

1. Clonar el repositorio

2. Crear una copia del ```.env.template``` y remplazarlo por ```.env``` y cambiar las variables de entorno

3. Instalar dependencias```npm install```

4. Configurar las variables de entorno en el archivo `.env`
5. Correr el proyecto

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


## Instalaciones hechas

```bash

--React Icons
npm install react-icons --save

--Zustand
npm install zustand

--clsx
npm install clsx

--swiper
npm install swiper

--ts-node
npm i -D ts-node

npx tsc --init

--zod
npm install zod

--Bcryptjs
npm install bcryptjs

--React Hook Form
npm install react-hook-form

--Axios
npm install axios

--Cloudinary
npm install cloudinary

--Next Themes
npm install next-themes

--Cookies Next
npm install cookies-next
```

## Configuración de la API

El proyecto está configurado para trabajar con una API externa. Asegúrate de configurar las siguientes variables de entorno:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Cloudinary (para imágenes)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Endpoints principales utilizados:
- `POST /api/auth/login` - Autenticación de usuarios
- `POST /api/auth/register` - Registro de usuarios
- `GET /api/products` - Obtener productos
- `GET /api/categories` - Obtener categorías
- `POST /api/orders` - Crear órdenes
- `GET /api/orders` - Obtener órdenes del usuario
- `POST /api/address` - Gestionar direcciones
- `GET /api/users` - Gestión de usuarios (admin)
- `GET /api/sales` - Reportes de ventas (admin)

## Correr en produccion

