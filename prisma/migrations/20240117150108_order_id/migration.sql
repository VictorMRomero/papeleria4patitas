-- DropIndex
DROP INDEX "OrderItem_orderId_key";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "transactionId" TEXT;
