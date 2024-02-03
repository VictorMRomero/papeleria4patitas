/*
  Warnings:

  - You are about to drop the column `fecha_inicio` on the `Descuento` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Descuento" DROP COLUMN "fecha_inicio",
ALTER COLUMN "fecha_fin" SET DATA TYPE TEXT;
