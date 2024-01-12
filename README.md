Este es un proyecto realizado con [Next.js](https://nextjs.org/)

## Descripcion

Pasos para correr el servidor:

1. Clonar el repositorio

2. Crear una copia del ```.env.template``` y remplazarlo por ```.env``` y cambiar las variables de entorno

3. Instalar dependencias```npm install```

4. Levantar la base de datos ```docker compose up - d```
5. Correr las migraciones de prisma
```npx prisma migrate dev```
6. Ejecutar seed 
```npm run seed```

7. Correr el proyecto

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

--Prisma
npm install prisma --save-dev

npx prisma init --datasource-provider PostgreSQL

npx prisma migrate dev --name ProductCategory

--ts-node
npm i -D ts-node

npx tsc --init
```

## Correr en produccion

