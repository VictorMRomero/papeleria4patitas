/*
  Warnings:

  - You are about to drop the column `stateId` on the `OrderAddress` table. All the data in the column will be lost.
  - You are about to drop the column `stateId` on the `UserAddress` table. All the data in the column will be lost.
  - You are about to drop the `State` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `estadoId` to the `OrderAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estadoId` to the `UserAddress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderAddress" DROP CONSTRAINT "OrderAddress_stateId_fkey";

-- DropForeignKey
ALTER TABLE "UserAddress" DROP CONSTRAINT "UserAddress_stateId_fkey";

-- AlterTable
ALTER TABLE "OrderAddress" DROP COLUMN "stateId",
ADD COLUMN     "estadoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserAddress" DROP COLUMN "stateId",
ADD COLUMN     "estadoId" TEXT NOT NULL;

-- DropTable
DROP TABLE "State";

-- CreateTable
CREATE TABLE "Estado" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Estado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Estado_name_key" ON "Estado"("name");

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "Estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderAddress" ADD CONSTRAINT "OrderAddress_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "Estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
