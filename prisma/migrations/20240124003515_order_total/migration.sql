/*
  Warnings:

  - You are about to drop the column `address` on the `OrderAddress` table. All the data in the column will be lost.
  - You are about to drop the column `address2` on the `OrderAddress` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `OrderAddress` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `OrderAddress` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `UserAddress` table. All the data in the column will be lost.
  - You are about to drop the column `address2` on the `UserAddress` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `UserAddress` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `UserAddress` table. All the data in the column will be lost.
  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `total` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `calle` to the `OrderAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localidad` to the `OrderAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateId` to the `OrderAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `calle` to the `UserAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localidad` to the `UserAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateId` to the `UserAddress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderAddress" DROP CONSTRAINT "OrderAddress_countryId_fkey";

-- DropForeignKey
ALTER TABLE "UserAddress" DROP CONSTRAINT "UserAddress_countryId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "OrderAddress" DROP COLUMN "address",
DROP COLUMN "address2",
DROP COLUMN "city",
DROP COLUMN "countryId",
ADD COLUMN     "calle" TEXT NOT NULL,
ADD COLUMN     "detalle" TEXT,
ADD COLUMN     "localidad" TEXT NOT NULL,
ADD COLUMN     "referencia" TEXT,
ADD COLUMN     "stateId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserAddress" DROP COLUMN "address",
DROP COLUMN "address2",
DROP COLUMN "city",
DROP COLUMN "countryId",
ADD COLUMN     "calle" TEXT NOT NULL,
ADD COLUMN     "detalle" TEXT,
ADD COLUMN     "localidad" TEXT NOT NULL,
ADD COLUMN     "referencia" TEXT,
ADD COLUMN     "stateId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Country";

-- CreateTable
CREATE TABLE "State" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "State_name_key" ON "State"("name");

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderAddress" ADD CONSTRAINT "OrderAddress_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
